from __future__ import annotations

import hashlib
import re
from collections import OrderedDict
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "src/app/projects.raw.txt"
OUTPUT = ROOT / "database/projects-seed.sql"


def normalize_title(title: str) -> str:
    return re.sub(r"\s*\(\d+차년도\)\s*$", "", title).strip()


def project_key(title: str) -> str:
    digest = hashlib.sha256(title.encode("utf-8")).hexdigest()[:24]
    return f"project_{digest}"


def sql_string(value: str) -> str:
    return "'" + value.replace("'", "''") + "'"


def parse_projects():
    projects: OrderedDict[str, dict] = OrderedDict()
    year_orders: list[tuple[str, int, int]] = []
    year: int | None = None
    position = 0

    for line in SOURCE.read_text(encoding="utf-8-sig").splitlines():
        line = line.strip()
        if not line:
            continue
        if re.fullmatch(r"\d{4}", line):
            year = int(line)
            position = 0
            continue
        if year is None or "|" not in line:
            continue

        raw_title, organization = (part.strip() for part in line.split("|", 1))
        title = normalize_title(raw_title)
        key = project_key(title)
        position += 1

        if key not in projects:
            projects[key] = {
                "title": title,
                "organization": organization,
                "start_year": year,
                "end_year": year,
            }
        else:
            projects[key]["start_year"] = min(projects[key]["start_year"], year)
            projects[key]["end_year"] = max(projects[key]["end_year"], year)

        year_orders.append((key, year, position))

    return projects, year_orders


def main() -> None:
    projects, year_orders = parse_projects()

    project_values = []
    for key, project in projects.items():
        project_values.append(
            "  ("
            + ", ".join(
                (
                    sql_string(key),
                    sql_string(project["title"]),
                    sql_string(project["organization"]),
                    str(project["start_year"]),
                    str(project["end_year"]),
                )
            )
            + ")"
        )

    order_values = [
        f"  ({sql_string(key)}, {year}, {display_order})"
        for key, year, display_order in year_orders
    ]

    sql = (
        "INSERT INTO projects "
        "(project_key, title, organization, start_year, end_year) VALUES\n"
        + ",\n".join(project_values)
        + "\nON CONFLICT (project_key) DO UPDATE SET\n"
        + "  title = EXCLUDED.title,\n"
        + "  organization = EXCLUDED.organization,\n"
        + "  start_year = EXCLUDED.start_year,\n"
        + "  end_year = EXCLUDED.end_year,\n"
        + "  updated_at = NOW();\n\n"
        + "INSERT INTO project_year_orders (project_id, active_year, display_order)\n"
        + "SELECT projects.id, seed.active_year, seed.display_order\n"
        + "FROM (VALUES\n"
        + ",\n".join(order_values)
        + "\n) AS seed(project_key, active_year, display_order)\n"
        + "JOIN projects ON projects.project_key = seed.project_key\n"
        + "ON CONFLICT (project_id, active_year) DO UPDATE SET\n"
        + "  display_order = EXCLUDED.display_order;\n"
    )

    OUTPUT.write_text(sql, encoding="utf-8")
    print(
        f"Generated {len(projects)} projects and {len(year_orders)} yearly order rows in {OUTPUT}"
    )


if __name__ == "__main__":
    main()
