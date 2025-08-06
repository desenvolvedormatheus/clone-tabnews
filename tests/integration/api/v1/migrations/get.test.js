import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

test("Get deve retornar status 200", async () => {
  const response = await getResponseApi(false, 1, "migrations");
  expect(response.status).toBe(200);

  const responseBody = await getResponseApi(true, 1, "migrations");

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});

async function getResponseApi(body = false, version, enpoint, params = "") {
  if (body) {
    return (await fetch(`http://localhost:3000/api/v${version}/${enpoint}?${params}`)).json();
  } else {
    return await fetch(`http://localhost:3000/api/v${version}/${enpoint}?${params}`);
  }
}