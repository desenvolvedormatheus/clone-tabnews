import database from "infra/database.js";
import orcherstrator from "tests/orcherstrator.js";

beforeAll(async () => {
  await orcherstrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
})

test("Post deve retornar status 200", async () => {
  const response = await getResponseApi(false, 1, "migrations");
  const responseBody = await response.json();

  expect(response.status).toBe(201);
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);

  // Segunda requisição
  const response2 = await getResponseApi(false, 1, "migrations");
  const response2Body = await response2.json();

  expect(response2.status).toBe(200);
  expect(Array.isArray(response2Body)).toBe(true);
  expect(response2Body.length).toBe(0);
});

async function getResponseApi(body = false, version, enpoint, params = "") {
  if (body) {
    return (await fetch(`http://localhost:3000/api/v${version}/${enpoint}?${params}`, {
      method: "POST"
    })).json();
  } else {
    return await fetch(`http://localhost:3000/api/v${version}/${enpoint}?${params}`, {
      method: "POST"
    });
  }
}