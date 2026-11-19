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

test("unknown API routes return a JSON 404", async () => {
  const response = await fetch(`${baseUrl}/api/unknown-route`);

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), {
    success: false,
    message: "Route not found",
  });
});

test("malformed JSON returns a JSON 400", async () => {
  const response = await fetch(`${baseUrl}/api/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{",
  });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    success: false,
    message: "Invalid JSON request body",
  });
});

test("oversized JSON returns a JSON 413", async () => {
  const response = await fetch(`${baseUrl}/api/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ payload: "x".repeat(1024 * 1024) }),
  });

  assert.equal(response.status, 413);
  assert.deepEqual(await response.json(), {
    success: false,
    message: "Request body exceeds the 1 MB limit",
  });
});

test("unsupported image types return a JSON 415", async () => {
  const formData = new FormData();
  formData.append("image", new Blob(["not an image"], { type: "image/gif" }), "image.gif");

  const response = await fetch(`${baseUrl}/api/project/create`, {
    method: "POST",
    body: formData,
  });

  assert.equal(response.status, 415);
  assert.deepEqual(await response.json(), {
    success: false,
    message: "Only PNG, JPG, and WEBP images are supported",
  });
});
