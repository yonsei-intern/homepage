import http from "node:http";

const request = http.get("http://127.0.0.1:3000/api/health", (response) => {
  response.resume();
  process.exit(response.statusCode === 200 ? 0 : 1);
});

request.on("error", () => process.exit(1));
request.setTimeout(3000, () => {
  request.destroy();
  process.exit(1);
});
