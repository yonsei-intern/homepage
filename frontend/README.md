# AI Security Lab Homepage

## Docker로 실행

프로젝트 루트에서 실행합니다.

```bash
docker compose up -d --build
docker compose ps
```

현재 포트 구성은 다음과 같습니다.

| 서비스 | 접속 주소 | 외부 접근 |
| --- | --- | --- |
| 홈페이지 | `http://localhost` 또는 `http://서버IP` | 가능 (`0.0.0.0:80`) |
| 관리자 페이지 | `http://localhost:3001` 또는 `http://서버IP:3001` | 가능 (`0.0.0.0:3001`) |
| API | `http://127.0.0.1:3000` | 호스트 내부에서만 가능 |
| PostgreSQL | `127.0.0.1:5432` | 호스트 내부에서만 가능 |

홈페이지는 기본 HTTP 포트인 `80`을 사용하므로 주소 뒤에 포트 번호를 붙이지 않습니다.
포트 80을 다른 프로그램이 사용 중이면 해당 프로그램을 종료하거나
`docker-compose.yml`의 web 포트를 변경해야 합니다.

관리자 페이지에는 로그인 기능이 없습니다. `3001` 포트를 인터넷에 직접
공개하지 말고 내부망, 방화벽 또는 VPN 환경에서만 사용하는 것을 권장합니다.

종료할 때는 다음 명령을 사용합니다.

```bash
docker compose down
```

`docker compose down -v`는 DB 볼륨까지 삭제하므로 DB를 초기화할 때만 사용합니다.

## 현재 DB 백업

관리자 페이지에서 데이터를 수정한 뒤 프로젝트를 옮기거나 Git에 올리기 전에
반드시 다음 명령을 실행합니다.

```bash
./scripts/backup-db.sh
```

현재 PostgreSQL의 모든 테이블 데이터와 ID가 다음 파일에 저장됩니다.

```text
database/current-data.sql
```

업로드된 사진은 DB가 아니라 다음 경로에 저장됩니다.

```text
public/images/
```

따라서 Git으로 옮길 때는 DB 스냅샷과 사진을 함께 커밋해야 합니다.

```bash
git add database/current-data.sql public/images
git commit -m "DB 데이터와 홈페이지 이미지 갱신"
git push
```

`.env`, `node_modules`, `dist`와 개발 로그는 이전에 필요하지 않으며
`.gitignore`에서 제외됩니다.

## 새 컴퓨터에서 DB와 사진 복원

저장소를 clone한 뒤 실행합니다.

```bash
git clone https://github.com/yosiimich/homepage.git
cd homepage/frontend
docker compose up -d --build
```

새 PostgreSQL 볼륨에서는 다음 작업이 자동으로 수행됩니다.

1. 모든 DB 테이블 생성
2. `database/current-data.sql`의 데이터와 ID 복원
3. API, 관리자 페이지, 홈페이지 실행

사진은 Git에 포함된 `public/images/`에서 그대로 제공됩니다.

## 이미 실행한 컴퓨터에 DB 스냅샷 적용

대상 컴퓨터의 기존 DB를 현재 스냅샷으로 완전히 교체해도 되는 경우 가장
확실한 방법은 DB 볼륨을 새로 만드는 것입니다.

> 아래 명령은 대상 컴퓨터에 있던 기존 DB 데이터를 삭제합니다.

```bash
docker compose down -v
docker compose up -d --build
```

기존 볼륨을 유지하면서 같은 스키마의 데이터만 교체하려면 다음을 사용합니다.

```bash
docker compose up -d db
./scripts/restore-db.sh
docker compose up -d --build
```

복원 후 상태를 확인합니다.

```bash
docker compose ps
docker compose logs --tail=100 api db
```
