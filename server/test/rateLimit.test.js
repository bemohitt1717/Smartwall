import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import app from "../app.js";

let server;
let baseUrl;

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, resolve);
  });

  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) reject(error);
      else resolve();
    });
  });
});

const post = (path) =>
  fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{}",
  });

test("limits repeated authentication attempts per client IP", async () => {
  const statuses = [];

  for (let attempt = 0; attempt < 11; attempt += 1) {
    const response = await post("/api/user/login");
    statuses.push(response.status);
  }

  assert.deepEqual(statuses.slice(0, 10), Array(10).fill(400));
  assert.equal(statuses[10], 429);
});

test("limits image uploads without throttling the general API", async () => {
  const statuses = [];

  for (let attempt = 0; attempt < 21; attempt += 1) {
    const response = await post("/api/project/create");
    statuses.push(response.status);
  }

  assert.deepEqual(statuses.slice(0, 20), Array(20).fill(400));
  assert.equal(statuses[20], 429);
});
