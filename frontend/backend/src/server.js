import express from "express";
import pg from "pg";

const { Pool } = pg;
const port = Number(process.env.PORT ?? 3000);

const pool = new Pool({
  host: process.env.PGHOST ?? "localhost",
  port: Number(process.env.PGPORT ?? 5432),
  database: process.env.PGDATABASE ?? "homepage",
  user: process.env.PGUSER ?? "homepage_reader",
  max: 5,
  idleTimeoutMillis: 30_000,
  connectionTimeoutMillis: 5_000,
  statement_timeout: 5_000,
});

const app = express();
app.disable("x-powered-by");

app.get("/api/health", async (_request, response, next) => {
  try {
    await pool.query("SELECT 1");
    response.json({ status: "ok" });
  } catch (error) {
    next(error);
  }
});

app.get("/api/students", async (_request, response, next) => {
  try {
    const result = await pool.query(`
      SELECT id, course, name, note, photo_url, public_email
      FROM students
      ORDER BY
        CASE course WHEN 'phd' THEN 1 WHEN 'master' THEN 2 WHEN 'intern' THEN 3 ELSE 4 END,
        admission_year ASC NULLS LAST,
        admission_semester ASC NULLS LAST,
        CASE WHEN COALESCE(note, '') ~* 'part' THEN 1 ELSE 0 END,
        name ASC,
        id
    `);

    response.json(
      result.rows.map((student) => ({
        id: student.id,
        course: student.course,
        name: student.name,
        note: student.note,
        photoUrl: student.photo_url,
        publicEmail: student.public_email,
      })),
    );
  } catch (error) {
    next(error);
  }
});

app.get("/api/alumni", async (_request, response, next) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        school,
        degree,
        company
      FROM alumni
      WHERE is_published = TRUE
      ORDER BY id ASC
    `);

    response.json(
      result.rows.map((alumnus) => ({
        id: alumnus.id,
        name: alumnus.name,
        school: alumnus.school,
        degree: alumnus.degree,
        company: alumnus.company,
      })),
    );
  } catch (error) {
    next(error);
  }
});

app.get("/api/publications", async (_request, response, next) => {
  try {
    const result = await pool.query(`
      SELECT id, publication_year, category, citation, is_award, is_bk, has_impact_factor
      FROM publications
      ORDER BY
        publication_year DESC,
        CASE category
          WHEN 'international_conference' THEN 1
          WHEN 'international_journal' THEN 2
          WHEN 'domestic_journal' THEN 3
          WHEN 'domestic_conference' THEN 4
          ELSE 5
        END,
        publication_month DESC NULLS LAST,
        source_order,
        id
    `);

    response.json(
      result.rows.map((publication) => ({
        id: publication.id,
        year: String(publication.publication_year),
        category: publication.category,
        text: publication.citation,
        isAward: publication.is_award,
        isBk: publication.is_bk,
        hasImpactFactor: publication.has_impact_factor,
      })),
    );
  } catch (error) {
    next(error);
  }
});

app.get("/api/patents", async (_request, response, next) => {
  try {
    const result = await pool.query(`
      SELECT id, category, patent_number, title
      FROM patents
      ORDER BY
        CASE category
          WHEN 'international_registered' THEN 1
          WHEN 'international_filed' THEN 2
          WHEN 'domestic_registered' THEN 3
          WHEN 'domestic_filed' THEN 4
          WHEN 'software_output' THEN 5
          ELSE 6
        END,
        number_sort_key DESC,
        patent_number DESC,
        source_order,
        id
    `);

    response.json(
      result.rows.map((patent) => ({
        id: patent.id,
        category: patent.category,
        code: patent.patent_number,
        title: patent.title,
      })),
    );
  } catch (error) {
    next(error);
  }
});

app.get("/api/projects", async (_request, response, next) => {
  try {
    const result = await pool.query(`
      WITH current_year AS (
        SELECT EXTRACT(
          YEAR FROM CURRENT_TIMESTAMP AT TIME ZONE 'America/Los_Angeles'
        )::INTEGER AS value
      )
      SELECT
        projects.id,
        active_year.value AS active_year,
        projects.title,
        projects.organization
      FROM projects
      CROSS JOIN current_year
      CROSS JOIN LATERAL generate_series(
        projects.start_year,
        LEAST(projects.end_year, current_year.value)
      ) AS active_year(value)
      LEFT JOIN project_year_orders
        ON project_year_orders.project_id = projects.id
        AND project_year_orders.active_year = active_year.value
      WHERE projects.start_year <= current_year.value
      ORDER BY
        active_year.value DESC,
        COALESCE(
          projects.display_order::BIGINT,
          project_year_orders.display_order::BIGINT,
          1000000 + projects.id
        ),
        projects.id
    `);

    response.json(
      result.rows.map((project) => ({
        id: `${project.id}-${project.active_year}`,
        projectId: project.id,
        year: String(project.active_year),
        title: project.title,
        organization: project.organization,
      })),
    );
  } catch (error) {
    next(error);
  }
});

app.get("/api/latest-news", async (_request, response, next) => {
  try {
    const result = await pool.query(`
      SELECT id, news_year, source, title, summary, link_url
      FROM latest_news
      ORDER BY display_order, id
      LIMIT 5
    `);

    response.json(
      result.rows.map((news) => ({
        id: news.id,
        year: String(news.news_year),
        source: news.source,
        title: news.title,
        sub: news.summary,
        linkUrl: news.link_url,
      })),
    );
  } catch (error) {
    next(error);
  }
});

app.get("/api/professor", async (_request, response, next) => {
  try {
    const [activities, career, papers] = await Promise.all([
      pool.query("SELECT id, period, detail FROM professor_activities ORDER BY id ASC"),
      pool.query("SELECT id, period, detail FROM professor_career ORDER BY id ASC"),
      pool.query(`
        SELECT id, paper_year, citation, link_url
        FROM professor_papers
        ORDER BY paper_year DESC, id ASC
      `),
    ]);

    response.json({
      activities: activities.rows,
      career: career.rows,
      papers: papers.rows.map((paper) => ({
        id: paper.id,
        year: String(paper.paper_year),
        text: paper.citation,
        linkUrl: paper.link_url,
      })),
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/site-images", async (_request, response, next) => {
  try {
    const result = await pool.query(`
      SELECT slot_key, photo_url
      FROM site_images
      ORDER BY id ASC
    `);
    response.json(
      Object.fromEntries(result.rows.map((image) => [image.slot_key, image.photo_url])),
    );
  } catch (error) {
    next(error);
  }
});

app.get("/api/home-research-papers", async (_request, response, next) => {
  try {
    const result = await pool.query(`
      SELECT id, section_key, venue, title
      FROM home_research_papers
      ORDER BY
        CASE section_key
          WHEN 'ai_security' THEN 1
          WHEN 'deepfake_detection' THEN 2
          WHEN 'vulnerability_detection' THEN 3
          ELSE 4
        END,
        display_order ASC,
        id ASC
    `);

    response.json(
      result.rows.map((paper) => ({
        id: paper.id,
        sectionKey: paper.section_key,
        venue: paper.venue,
        title: paper.title,
      })),
    );
  } catch (error) {
    next(error);
  }
});

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ message: "데이터를 불러오지 못했습니다." });
});

const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Homepage API listening on port ${port}`);
});

const shutdown = async () => {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
