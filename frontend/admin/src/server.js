import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import pg from "pg";

const { Pool } = pg;
const port = Number(process.env.PORT ?? 3001);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imageRoot = process.env.IMAGE_ROOT ?? path.resolve(__dirname, "../../public/images");

const pool = new Pool({
  host: process.env.PGHOST ?? "localhost",
  port: Number(process.env.PGPORT ?? 5432),
  database: process.env.PGDATABASE ?? "homepage",
  user: process.env.PGUSER ?? "homepage_admin",
  max: 3,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
  statement_timeout: 5_000,
});

const resources = {
  students: {
    table: "students",
    fields: ["course", "name", "note", "photo_url", "public_email", "admission_year", "admission_semester"],
    nullable: ["note", "photo_url", "public_email", "admission_year", "admission_semester"],
    numeric: ["admission_year", "admission_semester"],
    orderBy: "id ASC",
  },
  alumni: {
    table: "alumni",
    fields: ["name", "school", "degree", "graduated_year", "graduated_semester", "company"],
    nullable: ["graduated_year", "graduated_semester"],
    numeric: ["graduated_year", "graduated_semester"],
    orderBy: "id ASC",
  },
  publications: {
    table: "publications",
    fields: ["publication_year", "publication_month", "category", "citation", "is_award", "is_bk", "has_impact_factor", "source_order"],
    nullable: ["publication_month"],
    numeric: ["publication_year", "publication_month", "source_order"],
    boolean: ["is_award", "is_bk", "has_impact_factor"],
    orderField: "source_order",
    orderBy: "id ASC",
  },
  patents: {
    table: "patents",
    fields: ["category", "patent_number", "title", "source_order"],
    nullable: [],
    numeric: ["source_order"],
    orderField: "source_order",
    orderBy: "id ASC",
  },
  projects: {
    table: "projects",
    fields: ["title", "organization", "start_year", "end_year", "display_order"],
    nullable: ["display_order"],
    numeric: ["start_year", "end_year", "display_order"],
    orderBy: "id ASC",
  },
  news: {
    table: "latest_news",
    fields: ["news_year", "source", "title", "summary", "link_url", "display_order"],
    nullable: ["summary", "link_url"],
    numeric: ["news_year", "display_order"],
    orderField: "display_order",
    orderBy: "id ASC",
  },
  professor_activities: {
    table: "professor_activities",
    fields: ["period", "detail"],
    nullable: [],
    numeric: [],
    orderBy: "id ASC",
  },
  professor_career: {
    table: "professor_career",
    fields: ["period", "detail"],
    nullable: [],
    numeric: [],
    orderBy: "id ASC",
  },
  professor_papers: {
    table: "professor_papers",
    fields: ["paper_year", "citation", "link_url"],
    nullable: ["link_url"],
    numeric: ["paper_year"],
    orderBy: "id ASC",
  },
  home_research_papers: {
    table: "home_research_papers",
    fields: ["section_key", "venue", "title", "display_order"],
    nullable: [],
    numeric: ["display_order"],
    orderField: "display_order",
    orderPartitionField: "section_key",
    orderBy: "id ASC",
  },
};

function patentSortKey(patentNumber) {
  const usNumber = /^US(\d+)/i.exec(patentNumber);
  if (usNumber) return usNumber[1];
  const groups = patentNumber.match(/\d+/g);
  return groups ? groups.join("") : "0";
}

function projectKey(title) {
  return `project_${crypto.createHash("sha256").update(title).digest("hex").slice(0, 24)}`;
}

function resourceFor(request, response) {
  const resource = resources[request.params.resource];
  if (!resource) {
    response.status(404).json({ message: "지원하지 않는 데이터 종류입니다." });
    return null;
  }
  return resource;
}

function normalizeBody(resource, body) {
  const data = {};
  for (const field of resource.fields) {
    if (!(field in body)) continue;
    let value = body[field];

    if (typeof value === "string") value = value.trim();
    if (value === "" && resource.nullable.includes(field)) value = null;
    if (resource.boolean?.includes(field)) {
      if (value === true || value === "true" || value === 1 || value === "1") value = true;
      else if (value === false || value === "false" || value === 0 || value === "0") value = false;
      else throw new Error(`${field} 값은 참/거짓이어야 합니다.`);
    }
    if (value !== null && resource.numeric.includes(field)) {
      const number = Number(value);
      if (!Number.isInteger(number)) throw new Error(`${field} 값은 정수여야 합니다.`);
      value = number;
    }
    data[field] = value;
  }
  return data;
}

const app = express();
app.disable("x-powered-by");

const allowedHostnames = new Set(
  (process.env.ADMIN_ALLOWED_HOSTS ?? "localhost,127.0.0.1,::1")
    .split(",")
    .map((hostname) => hostname.trim().replace(/^\[|\]$/g, ""))
    .filter(Boolean),
);
const allowAnyHostname = allowedHostnames.has("*");

app.use((request, response, next) => {
  const requestHostname = request.hostname.replace(/^\[|\]$/g, "");
  if (!allowAnyHostname && !allowedHostnames.has(requestHostname)) {
    return response.status(403).send("Host is not allowed");
  }

  const origin = request.headers.origin;
  if (origin) {
    try {
      const originHostname = new URL(origin).hostname.replace(/^\[|\]$/g, "");
      if (!allowAnyHostname && !allowedHostnames.has(originHostname)) {
        return response.status(403).send("Cross-origin access denied");
      }
    } catch {
      return response.status(403).send("Invalid origin");
    }
  }

  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("X-Frame-Options", "DENY");
  response.setHeader("Referrer-Policy", "no-referrer");
  response.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self' data:; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",
  );
  next();
});

app.use(express.json({ limit: "100kb" }));

app.post(
  "/admin-api/images",
  express.raw({ type: ["image/jpeg", "image/png", "application/octet-stream"], limit: "8mb" }),
  async (request, response, next) => {
    try {
      if (!Buffer.isBuffer(request.body) || request.body.length === 0) {
        return response.status(415).json({ message: "JPG 또는 PNG 이미지 파일을 선택해주세요." });
      }

      const kind = request.get("x-image-kind");
      const uploadTargets = {
        home: { folderName: "home", slotKey: "home_hero", label: "메인 페이지 대표 사진" },
        professor: { folderName: "professor", slotKey: "professor_profile", label: "교수님 프로필 사진" },
        student: { folderName: "students" },
        intern: { folderName: "interns" },
        general: { folderName: "general" },
      };
      const uploadTarget = uploadTargets[kind];
      if (!uploadTarget) {
        return response.status(400).json({ message: "올바른 사진 사용 위치를 선택해주세요." });
      }
      const { folderName } = uploadTarget;

      const requestedStudentId = request.get("x-student-id");
      let linkedStudent = null;
      if (requestedStudentId) {
        if (!/^[0-9]+$/.test(requestedStudentId) || !["student", "intern"].includes(kind)) {
          return response.status(400).json({ message: "사진을 적용할 인원 정보가 올바르지 않습니다." });
        }
        const studentResult = await pool.query(
          "SELECT id, name, course FROM students WHERE id = $1",
          [requestedStudentId],
        );
        if (studentResult.rowCount === 0) {
          return response.status(404).json({ message: "사진을 적용할 인원을 찾지 못했습니다." });
        }
        linkedStudent = studentResult.rows[0];
        const correctKind = kind === "intern" ? linkedStudent.course === "intern" : linkedStudent.course !== "intern";
        if (!correctKind) {
          return response.status(400).json({ message: "선택한 인원과 사진 사용 위치가 일치하지 않습니다." });
        }
      }

      let requestedName = "";
      try {
        requestedName = decodeURIComponent(request.get("x-file-name") ?? "").trim().normalize("NFC");
      } catch {
        return response.status(400).json({ message: "파일 이름 형식이 올바르지 않습니다." });
      }
      const baseName = requestedName.replace(/\.(?:jpe?g|png)$/i, "");
      if (!/^[\p{L}\p{N}][\p{L}\p{N}_-]{0,79}$/u.test(baseName)) {
        return response.status(400).json({
          message: "파일 이름은 1~80자의 한글·영문·숫자·하이픈(-)·밑줄(_)만 사용할 수 있습니다.",
        });
      }

      const isPng = request.body.length >= 8
        && request.body.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
      const isJpeg = request.body.length >= 3
        && request.body[0] === 0xff
        && request.body[1] === 0xd8
        && request.body[2] === 0xff;
      if (!isPng && !isJpeg) {
        return response.status(415).json({ message: "실제 JPG 또는 PNG 이미지 파일만 업로드할 수 있습니다." });
      }

      const extension = isPng ? "png" : "jpg";
      const fileName = `${baseName}.${extension}`;
      const targetDirectory = path.join(imageRoot, folderName);
      const targetPath = path.join(targetDirectory, fileName);
      const overwrite = request.get("x-overwrite") === "true";

      await fs.mkdir(targetDirectory, { recursive: true });
      try {
        await fs.writeFile(targetPath, request.body, { flag: overwrite ? "w" : "wx", mode: 0o644 });
      } catch (error) {
        if (error.code === "EEXIST") {
          return response.status(409).json({
            message: "같은 이름의 사진이 이미 있습니다. 덮어쓰기를 체크하거나 다른 이름을 사용해주세요.",
          });
        }
        throw error;
      }

      const photoUrl = `/images/${folderName}/${fileName}`;
      if (uploadTarget.slotKey) {
        await pool.query(
          `INSERT INTO site_images (slot_key, label, photo_url)
           VALUES ($1, $2, $3)
           ON CONFLICT (slot_key) DO UPDATE SET
             label = EXCLUDED.label,
             photo_url = EXCLUDED.photo_url,
             updated_at = NOW()`,
          [uploadTarget.slotKey, uploadTarget.label, photoUrl],
        );
      }
      if (linkedStudent) {
        await pool.query(
          "UPDATE students SET photo_url = $1, updated_at = NOW() WHERE id = $2",
          [photoUrl, linkedStudent.id],
        );
      }

      response.status(201).json({
        fileName,
        photoUrl,
        appliedSlot: uploadTarget.slotKey ?? null,
        linkedStudent: linkedStudent ? { id: linkedStudent.id, name: linkedStudent.name } : null,
      });
    } catch (error) {
      next(error);
    }
  },
);

app.get("/admin-api/health", async (_request, response, next) => {
  try {
    await pool.query("SELECT 1");
    response.json({ status: "ok" });
  } catch (error) {
    next(error);
  }
});

app.get("/admin-api/:resource", async (request, response, next) => {
  const resource = resourceFor(request, response);
  if (!resource) return;

  try {
    const columns = ["id", ...resource.fields].join(", ");
    const result = await pool.query(
      `SELECT ${columns} FROM ${resource.table} ORDER BY ${resource.orderBy}`,
    );
    response.json(result.rows);
  } catch (error) {
    next(error);
  }
});

app.post("/admin-api/students/:id/graduate", async (request, response, next) => {
  if (!/^\d+$/.test(request.params.id)) {
    return response.status(400).json({ message: "잘못된 학생 ID입니다." });
  }

  const body = request.body ?? {};
  const school = typeof body.school === "string" ? body.school.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const degree = body.degree;
  const graduatedYear = Number(body.graduated_year);
  const graduatedSemester = Number(body.graduated_semester);

  if (!school || !company) {
    return response.status(400).json({ message: "학교와 회사를 모두 입력해주세요." });
  }
  if (!['Ph.D.', 'M.S.'].includes(degree)) {
    return response.status(400).json({ message: "졸업 학위를 선택해주세요." });
  }
  if (!Number.isInteger(graduatedYear) || graduatedYear < 1900 || graduatedYear > 2100) {
    return response.status(400).json({ message: "올바른 졸업 연도를 입력해주세요." });
  }
  if (![1, 2].includes(graduatedSemester)) {
    return response.status(400).json({ message: "졸업 학기를 선택해주세요." });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const studentResult = await client.query(
      "SELECT id, name, course FROM students WHERE id = $1 FOR UPDATE",
      [request.params.id],
    );
    if (studentResult.rowCount === 0) {
      await client.query("ROLLBACK");
      return response.status(404).json({ message: "학생을 찾지 못했습니다." });
    }

    const student = studentResult.rows[0];
    const expectedDegree = student.course === "phd" ? "Ph.D." : student.course === "master" ? "M.S." : null;
    if (expectedDegree && degree !== expectedDegree) {
      await client.query("ROLLBACK");
      return response.status(400).json({
        message: `${student.course === "phd" ? "박사" : "석사"} 과정 학생의 졸업 학위를 확인해주세요.`,
      });
    }

    const alumniResult = await client.query(
      `INSERT INTO alumni
        (name, school, degree, graduated_year, graduated_semester, company)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [student.name, school, degree, graduatedYear, graduatedSemester, company],
    );
    await client.query("DELETE FROM students WHERE id = $1", [student.id]);
    await client.query("COMMIT");
    response.status(201).json(alumniResult.rows[0]);
  } catch (error) {
    await client.query("ROLLBACK").catch(() => {});
    next(error);
  } finally {
    client.release();
  }
});

app.post("/admin-api/:resource", async (request, response, next) => {
  const resource = resourceFor(request, response);
  if (!resource) return;

  try {
    const body = { ...request.body };
    if (resource.orderField && (body[resource.orderField] === "" || body[resource.orderField] == null)) {
      const partitionField = resource.orderPartitionField;
      const partitionValue = partitionField ? body[partitionField] : undefined;
      if (partitionField && !partitionValue) {
        return response.status(400).json({ message: `${partitionField} 값을 먼저 선택해주세요.` });
      }
      const orderResult = partitionField
        ? await pool.query(
          `SELECT COALESCE(MAX(${resource.orderField}), 0) + 1 AS next_order
           FROM ${resource.table} WHERE ${partitionField} = $1`,
          [partitionValue],
        )
        : await pool.query(
          `SELECT COALESCE(MAX(${resource.orderField}), 0) + 1 AS next_order FROM ${resource.table}`,
        );
      body[resource.orderField] = orderResult.rows[0].next_order;
    }

    const data = normalizeBody(resource, body);
    if (request.params.resource === "patents") {
      data.number_sort_key = patentSortKey(data.patent_number ?? "");
    }
    if (request.params.resource === "projects") {
      data.project_key = projectKey(data.title ?? "");
    }

    const columns = Object.keys(data);
    if (columns.length === 0) return response.status(400).json({ message: "저장할 값이 없습니다." });
    const values = columns.map((column) => data[column]);
    const placeholders = values.map((_, index) => `$${index + 1}`);
    const result = await pool.query(
      `INSERT INTO ${resource.table} (${columns.join(", ")}) VALUES (${placeholders.join(", ")}) RETURNING *`,
      values,
    );
    response.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

app.put("/admin-api/:resource/:id", async (request, response, next) => {
  const resource = resourceFor(request, response);
  if (!resource) return;
  if (!/^\d+$/.test(request.params.id)) return response.status(400).json({ message: "잘못된 ID입니다." });

  try {
    const data = normalizeBody(resource, request.body);
    if (request.params.resource === "patents" && "patent_number" in data) {
      data.number_sort_key = patentSortKey(data.patent_number);
    }

    const columns = Object.keys(data);
    if (columns.length === 0) return response.status(400).json({ message: "수정할 값이 없습니다." });
    const values = columns.map((column) => data[column]);
    const assignments = columns.map((column, index) => `${column} = $${index + 1}`);
    values.push(request.params.id);
    const result = await pool.query(
      `UPDATE ${resource.table} SET ${assignments.join(", ")}, updated_at = NOW() WHERE id = $${values.length} RETURNING *`,
      values,
    );
    if (result.rowCount === 0) return response.status(404).json({ message: "데이터를 찾지 못했습니다." });
    response.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

app.delete("/admin-api/:resource/:id", async (request, response, next) => {
  const resource = resourceFor(request, response);
  if (!resource) return;
  if (!/^\d+$/.test(request.params.id)) return response.status(400).json({ message: "잘못된 ID입니다." });

  try {
    const result = await pool.query(
      `DELETE FROM ${resource.table} WHERE id = $1 RETURNING id`,
      [request.params.id],
    );
    if (result.rowCount === 0) return response.status(404).json({ message: "데이터를 찾지 못했습니다." });
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.use(express.static(path.join(__dirname, "../public"), { index: "index.html" }));

app.use((error, _request, response, _next) => {
  console.error(error);
  if (error.type === "entity.too.large") {
    return response.status(413).json({ message: "사진 파일은 최대 8MB까지 업로드할 수 있습니다." });
  }
  const clientError = ["23502", "23505", "23514", "22001", "22P02"].includes(error.code);
  const clientMessages = {
    "23502": "필수 입력값을 모두 입력해주세요.",
    "23505": "같은 데이터가 이미 존재합니다.",
    "23514": "입력값의 형식이나 허용 범위를 확인해주세요.",
    "22001": "입력값이 허용된 길이보다 깁니다.",
    "22P02": "숫자 또는 날짜 형식을 확인해주세요.",
  };
  response.status(clientError ? 400 : 500).json({
    message: clientError ? clientMessages[error.code] : "관리자 요청 처리 중 오류가 발생했습니다.",
  });
});

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Homepage local admin listening on port ${port}`);
});

const shutdown = async () => {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
