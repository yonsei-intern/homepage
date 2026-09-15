const resources = {
  students: {
    label: "재학생/인턴",
    description: "과정별로 입학 연도와 학기가 빠른 학생부터 표시됩니다.",
    fields: [
      { name: "course", label: "과정", type: "select", options: [["phd", "박사"], ["master", "석사"], ["intern", "인턴"]], required: true },
      { name: "name", label: "이름", required: true },
      { name: "note", label: "비고" },
      { name: "photo_url", label: "사진 경로", hint: "/images/students/name.jpg" },
      { name: "public_email", label: "공개 이메일", type: "email" },
      { name: "admission_year", label: "입학 연도", type: "number", min: 1900, max: 2100, required: true },
      { name: "admission_semester", label: "입학 학기", type: "select", options: [["1", "1학기"], ["2", "2학기"]], required: true },
    ],
  },
  alumni: {
    label: "졸업생",
    description: "현재 관리자와 공개 홈페이지 모두 ID가 작은 순서로 표시됩니다.",
    fields: [
      { name: "name", label: "이름", required: true },
      { name: "school", label: "학교", required: true },
      { name: "degree", label: "학위", type: "select", options: [["Ph.D.", "박사"], ["M.S.", "석사"]], required: true },
      { name: "graduated_year", label: "졸업 연도", type: "number", min: 1900, max: 2100, required: true },
      { name: "graduated_semester", label: "졸업 학기", type: "select", options: [["1", "1학기"], ["2", "2학기"]], required: true },
      { name: "company", label: "회사", required: true },
    ],
  },
  publications: {
    label: "논문",
    description: "수상·BK 문구는 빨간색, Impact Factor 문구는 파란색으로 표시할 수 있습니다.",
    fields: [
      { name: "publication_year", label: "연도", type: "number", required: true },
      { name: "publication_month", label: "월", type: "number", min: 1, max: 12 },
      { name: "category", label: "분류", type: "select", required: true, options: [["international_conference", "해외 컨퍼런스"], ["international_journal", "해외 저널"], ["domestic_journal", "국내 저널"], ["domestic_conference", "국내 컨퍼런스"]] },
      { name: "is_award", label: "수상", type: "checkbox", hint: "수상 관련 문구를 빨간색으로 표시" },
      { name: "is_bk", label: "BK", type: "checkbox", hint: "BK 관련 문구를 빨간색으로 표시" },
      { name: "has_impact_factor", label: "Impact Factor", type: "checkbox", hint: "Impact Factor 문구를 파란색으로 표시" },
      { name: "source_order", label: "정렬값", type: "number", hint: "같은 연도·분류·월 안에서 사용" },
      { name: "citation", label: "논문 정보", type: "textarea", wide: true, required: true },
    ],
  },
  patents: {
    label: "특허/SW",
    description: "분류 → 특허 번호가 큰 순서로 표시됩니다.",
    fields: [
      { name: "category", label: "분류", type: "select", required: true, options: [["international_registered", "국제 특허 등록"], ["international_filed", "국제 특허 출원"], ["domestic_registered", "국내 특허 등록"], ["domestic_filed", "국내 특허 출원"], ["software_output", "SW 연구성과물"]] },
      { name: "patent_number", label: "특허/등록 번호", required: true },
      { name: "source_order", label: "정렬값", type: "number" },
      { name: "title", label: "명칭", type: "textarea", wide: true, required: true },
    ],
  },
  projects: {
    label: "프로젝트",
    description: "진행 기간의 연도에만 표시됩니다. 미래 연도는 해당 연도가 될 때 자동 공개됩니다.",
    fields: [
      { name: "title", label: "프로젝트명", type: "textarea", wide: true, required: true },
      { name: "organization", label: "기관", required: true },
      { name: "start_year", label: "시작 연도", type: "number", required: true },
      { name: "end_year", label: "종료 연도", type: "number", required: true },
      { name: "display_order", label: "전체 연도 수동 정렬값", type: "number", hint: "비워두면 기존 연도별 순서, 입력하면 모든 연도에 우선 적용" },
    ],
  },
  news: {
    label: "Latest News",
    description: "정렬값 순서로 표시되며 링크가 있으면 행 전체가 클릭됩니다.",
    fields: [
      { name: "news_year", label: "연도", type: "number", required: true },
      { name: "source", label: "출처", required: true },
      { name: "title", label: "제목", type: "textarea", wide: true, required: true },
      { name: "summary", label: "부가 설명", type: "textarea", wide: true },
      { name: "link_url", label: "링크", type: "url", wide: true, hint: "http:// 또는 https://" },
      { name: "display_order", label: "정렬값", type: "number", hint: "작을수록 먼저 표시" },
    ],
  },
  professor_activities: {
    label: "교수 주요 활동",
    description: "교수 페이지의 주요 활동이며 ID 순서로 표시됩니다.",
    fields: [
      { name: "period", label: "기간", required: true, hint: "예: 2024-현재" },
      { name: "detail", label: "활동 내용", type: "textarea", wide: true, required: true },
    ],
  },
  professor_career: {
    label: "교수 주요 경력",
    description: "교수 페이지의 주요 경력이며 ID 순서로 표시됩니다.",
    fields: [
      { name: "period", label: "기간", required: true, hint: "예: 2022-2024" },
      { name: "detail", label: "경력 내용", type: "textarea", wide: true, required: true },
    ],
  },
  professor_papers: {
    label: "교수 주요 논문",
    description: "교수 페이지에서는 논문 연도가 최신인 순서로 표시됩니다.",
    fields: [
      { name: "paper_year", label: "논문 연도", type: "number", min: 1900, max: 2100, required: true },
      { name: "citation", label: "논문 정보", type: "textarea", wide: true, required: true },
      { name: "link_url", label: "논문 링크", type: "url", wide: true, hint: "비워두면 Google Scholar 검색 링크 사용" },
    ],
  },
  home_research_papers: {
    label: "메인 연구 논문",
    description: "메인 페이지 01·02·03 옆의 논문 목록입니다. 각 섹션 안에서 정렬값이 작은 항목부터 표시됩니다.",
    fields: [
      { name: "section_key", label: "연구 분야", type: "select", required: true, options: [["ai_security", "01 AI 보안"], ["deepfake_detection", "02 딥페이크 탐지"], ["vulnerability_detection", "03 취약점 탐지"]] },
      { name: "venue", label: "학회/저널 및 연도", required: true, hint: "예: RAID 2025" },
      { name: "title", label: "논문 제목", type: "textarea", wide: true, required: true },
      { name: "display_order", label: "정렬값", type: "number", hint: "비워두면 해당 연구 분야의 마지막에 추가" },
    ],
  },
};

const tabs = document.querySelector("#resource-tabs");
const title = document.querySelector("#resource-title");
const description = document.querySelector("#resource-description");
const status = document.querySelector("#status");
const tableHead = document.querySelector("#table-head");
const tableBody = document.querySelector("#table-body");
const search = document.querySelector("#search");
const addButton = document.querySelector("#add-button");
const reloadButton = document.querySelector("#reload-button");
const photoUploadButton = document.querySelector("#upload-photo-button");
const dialog = document.querySelector("#editor-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const form = document.querySelector("#editor-form");
const formFields = document.querySelector("#form-fields");
const formError = document.querySelector("#form-error");
const deleteButton = document.querySelector("#delete-button");
const graduateDialog = document.querySelector("#graduate-dialog");
const graduateForm = document.querySelector("#graduate-form");
const graduateStudentName = document.querySelector("#graduate-student-name");
const graduateDegree = document.querySelector("#graduate-degree");
const graduateYear = document.querySelector("#graduate-year");
const graduateError = document.querySelector("#graduate-error");
const photoUploadDialog = document.querySelector("#photo-upload-dialog");
const photoUploadForm = document.querySelector("#photo-upload-form");
const photoUploadError = document.querySelector("#photo-upload-error");
const photoUploadResult = document.querySelector("#photo-upload-result");
const photoUploadPath = document.querySelector("#photo-upload-path");
const uploadImageKind = document.querySelector("#upload-image-kind");
const uploadMemberField = document.querySelector("#upload-member-field");
const uploadMemberId = document.querySelector("#upload-member-id");

let activeResource = "students";
let rows = [];
let editingId = null;
let graduatingStudent = null;
let uploadMembers = [];

function setStatus(message, isError = false) {
  status.textContent = message;
  status.classList.toggle("error", isError);
}

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: options.headers ?? (typeof options.body === "string" ? { "Content-Type": "application/json" } : undefined),
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message || `요청 실패 (${response.status})`);
  }
  return response.status === 204 ? null : response.json();
}

function renderTabs() {
  tabs.replaceChildren();
  for (const [key, resource] of Object.entries(resources)) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `tab${key === activeResource ? " active" : ""}`;
    button.textContent = resource.label;
    button.addEventListener("click", () => {
      activeResource = key;
      search.value = "";
      renderTabs();
      loadRows();
    });
    tabs.append(button);
  }
}

function displayValue(field, value) {
  if (value === null || value === undefined || value === "") return "-";
  if (field.type === "checkbox") return value ? "체크" : "-";
  const option = field.options?.find(([key]) => String(key) === String(value));
  return option ? option[1] : String(value);
}

function renderTable() {
  const resource = resources[activeResource];
  const query = search.value.trim().toLowerCase();
  const filtered = query
    ? rows.filter((row) => JSON.stringify(row).toLowerCase().includes(query))
    : rows;

  const headerRow = document.createElement("tr");
  const idHeader = document.createElement("th");
  idHeader.textContent = "ID";
  headerRow.append(idHeader);
  for (const field of resource.fields) {
    const th = document.createElement("th");
    th.textContent = field.label;
    headerRow.append(th);
  }
  const actionsHeader = document.createElement("th");
  actionsHeader.textContent = "관리";
  headerRow.append(actionsHeader);
  tableHead.replaceChildren(headerRow);
  tableBody.replaceChildren();

  if (filtered.length === 0) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.className = "empty";
    td.colSpan = resource.fields.length + 2;
    td.textContent = "표시할 데이터가 없습니다.";
    tr.append(td);
    tableBody.append(tr);
    return;
  }

  for (const row of filtered) {
    const tr = document.createElement("tr");
    const idCell = document.createElement("td");
    idCell.textContent = row.id;
    tr.append(idCell);

    for (const field of resource.fields) {
      const td = document.createElement("td");
      const span = document.createElement("span");
      const value = displayValue(field, row[field.name]);
      span.className = "cell-text";
      span.textContent = value;
      span.title = value;
      td.append(span);
      tr.append(td);
    }

    const actionCell = document.createElement("td");
    const actions = document.createElement("div");
    actions.className = "row-actions";
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "small-button";
    editButton.textContent = "수정";
    editButton.addEventListener("click", () => openEditor(row));
    actions.append(editButton);
    if (activeResource === "students") {
      const graduateButton = document.createElement("button");
      graduateButton.type = "button";
      graduateButton.className = "small-button graduate";
      graduateButton.textContent = "졸업 처리";
      graduateButton.addEventListener("click", () => openGraduateDialog(row));
      actions.append(graduateButton);
    }
    actionCell.append(actions);
    tr.append(actionCell);
    tableBody.append(tr);
  }

  setStatus(`${filtered.length}개 표시 / 전체 ${rows.length}개`);
}

async function loadRows() {
  const resource = resources[activeResource];
  title.textContent = resource.label;
  description.textContent = resource.description;
  setStatus("불러오는 중...");
  tableBody.replaceChildren();
  try {
    rows = await request(`/admin-api/${activeResource}`);
    renderTable();
  } catch (error) {
    rows = [];
    renderTable();
    setStatus(error.message, true);
  }
}

function makeField(field, row) {
  const wrapper = document.createElement("div");
  wrapper.className = `field${field.wide ? " wide" : ""}`;
  const label = document.createElement("label");
  label.htmlFor = `field-${field.name}`;
  label.textContent = field.label;

  let input;
  if (field.type === "checkbox") {
    input = document.createElement("input");
    input.type = "checkbox";
    input.checked = Boolean(row?.[field.name]);
  } else if (field.type === "select") {
    input = document.createElement("select");
    const empty = document.createElement("option");
    empty.value = "";
    empty.textContent = "선택";
    input.append(empty);
    for (const [value, text] of field.options) {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = text;
      input.append(option);
    }
  } else if (field.type === "textarea") {
    input = document.createElement("textarea");
  } else {
    input = document.createElement("input");
    input.type = field.type || "text";
    if (field.min !== undefined) input.min = field.min;
    if (field.max !== undefined) input.max = field.max;
  }

  input.id = `field-${field.name}`;
  input.name = field.name;
  input.required = Boolean(field.required);
  if (field.type !== "checkbox") input.value = row?.[field.name] ?? "";
  wrapper.append(label, input);

  if (field.hint) {
    const hint = document.createElement("small");
    hint.textContent = field.hint;
    wrapper.append(hint);
  }
  return wrapper;
}

function openEditor(row = null) {
  editingId = row?.id ?? null;
  dialogTitle.textContent = row ? `${resources[activeResource].label} 수정` : `${resources[activeResource].label} 추가`;
  formFields.replaceChildren();
  formError.textContent = "";
  for (const field of resources[activeResource].fields) {
    formFields.append(makeField(field, row));
  }
  deleteButton.hidden = !row;
  dialog.showModal();
}

function closeEditor() {
  dialog.close();
  editingId = null;
}

function openGraduateDialog(student) {
  graduatingStudent = student;
  graduateForm.reset();
  graduateError.textContent = "";
  graduateStudentName.textContent = student.name;
  graduateYear.value = new Date().getFullYear();

  const degree = student.course === "phd" ? "Ph.D." : student.course === "master" ? "M.S." : "";
  graduateDegree.value = degree;
  graduateDegree.disabled = Boolean(degree);
  graduateDialog.showModal();
}

function closeGraduateDialog() {
  graduateDialog.close();
  graduateDegree.disabled = false;
  graduatingStudent = null;
}

function renderUploadMembers() {
  const kind = uploadImageKind.value;
  const supportsMember = kind === "student" || kind === "intern";
  uploadMemberField.hidden = !supportsMember;
  uploadMemberId.replaceChildren();

  const emptyOption = document.createElement("option");
  emptyOption.value = "";
  emptyOption.textContent = "파일만 업로드";
  uploadMemberId.append(emptyOption);
  if (!supportsMember) return;

  const matchingMembers = uploadMembers.filter((member) =>
    kind === "intern" ? member.course === "intern" : member.course !== "intern",
  );
  for (const member of matchingMembers) {
    const option = document.createElement("option");
    option.value = member.id;
    option.textContent = `${member.name} (${member.course === "phd" ? "박사" : member.course === "master" ? "석사" : "인턴"})`;
    uploadMemberId.append(option);
  }
}

async function openPhotoUploadDialog() {
  photoUploadForm.reset();
  photoUploadError.textContent = "";
  photoUploadResult.hidden = true;
  photoUploadPath.textContent = "";
  try {
    uploadMembers = await request("/admin-api/students");
  } catch {
    uploadMembers = [];
  }
  renderUploadMembers();
  photoUploadDialog.showModal();
}

function closePhotoUploadDialog() {
  photoUploadDialog.close();
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  formError.textContent = "";
  const resource = resources[activeResource];
  const formData = new FormData(form);
  const payload = {};
  for (const field of resource.fields) {
    const value = formData.get(field.name);
    if (field.type === "checkbox") {
      payload[field.name] = form.elements[field.name].checked;
    } else {
      payload[field.name] = field.type === "number" && value !== "" ? Number(value) : value;
    }
  }

  try {
    if (editingId) {
      await request(`/admin-api/${activeResource}/${editingId}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    } else {
      await request(`/admin-api/${activeResource}`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }
    closeEditor();
    await loadRows();
  } catch (error) {
    formError.textContent = error.message;
  }
});

deleteButton.addEventListener("click", async () => {
  if (!editingId || !confirm("이 데이터를 삭제할까요? 삭제 후에는 되돌릴 수 없습니다.")) return;
  try {
    await request(`/admin-api/${activeResource}/${editingId}`, { method: "DELETE" });
    closeEditor();
    await loadRows();
  } catch (error) {
    formError.textContent = error.message;
  }
});

graduateForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!graduatingStudent) return;

  graduateError.textContent = "";
  const submitButton = event.submitter ?? graduateForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  const payload = {
    school: document.querySelector("#graduate-school").value,
    degree: graduateDegree.value,
    graduated_year: Number(graduateYear.value),
    graduated_semester: Number(document.querySelector("#graduate-semester").value),
    company: document.querySelector("#graduate-company").value,
  };
  const studentId = graduatingStudent.id;
  const studentName = graduatingStudent.name;

  try {
    await request(`/admin-api/students/${studentId}/graduate`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    closeGraduateDialog();
    await loadRows();
    setStatus(`${studentName} 학생을 졸업생으로 이동했습니다.`);
  } catch (error) {
    graduateError.textContent = error.message;
  } finally {
    submitButton.disabled = false;
  }
});

photoUploadForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  photoUploadError.textContent = "";
  photoUploadResult.hidden = true;

  const file = document.querySelector("#upload-image-file").files[0];
  const fileName = document.querySelector("#upload-file-name").value.trim();
  const imageKind = document.querySelector("#upload-image-kind").value;
  const memberId = uploadMemberId.value;
  const overwrite = document.querySelector("#upload-overwrite").checked;
  if (!file) {
    photoUploadError.textContent = "이미지 파일을 선택해주세요.";
    return;
  }

  const submitButton = event.submitter ?? photoUploadForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  try {
    const result = await request("/admin-api/images", {
      method: "POST",
      body: file,
      headers: {
        "Content-Type": file.type || "application/octet-stream",
        "X-Image-Kind": imageKind,
        "X-File-Name": encodeURIComponent(fileName),
        "X-Overwrite": String(overwrite),
        ...(memberId ? { "X-Student-Id": memberId } : {}),
      },
    });
    photoUploadPath.textContent = result.photoUrl;
    photoUploadResult.hidden = false;
    setStatus(result.appliedSlot || result.linkedStudent
      ? `${result.fileName} 사진을 업로드하고 홈페이지에 적용했습니다.`
      : `${result.fileName} 사진을 업로드했습니다.`);
  } catch (error) {
    photoUploadError.textContent = error.message;
  } finally {
    submitButton.disabled = false;
  }
});

document.querySelector("#copy-photo-path").addEventListener("click", async () => {
  if (!photoUploadPath.textContent) return;
  try {
    await navigator.clipboard.writeText(photoUploadPath.textContent);
    setStatus("사진 경로를 복사했습니다. 인원의 사진 경로 칸에 붙여넣으세요.");
  } catch {
    photoUploadError.textContent = "경로를 복사하지 못했습니다. 직접 선택해서 복사해주세요.";
  }
});

document.querySelector("#close-dialog").addEventListener("click", closeEditor);
document.querySelector("#cancel-button").addEventListener("click", closeEditor);
document.querySelector("#close-graduate-dialog").addEventListener("click", closeGraduateDialog);
document.querySelector("#cancel-graduate-button").addEventListener("click", closeGraduateDialog);
document.querySelector("#close-photo-upload-dialog").addEventListener("click", closePhotoUploadDialog);
document.querySelector("#cancel-photo-upload-button").addEventListener("click", closePhotoUploadDialog);
photoUploadButton.addEventListener("click", openPhotoUploadDialog);
uploadImageKind.addEventListener("change", renderUploadMembers);
addButton.addEventListener("click", () => openEditor());
reloadButton.addEventListener("click", loadRows);
search.addEventListener("input", renderTable);

renderTabs();
loadRows();
