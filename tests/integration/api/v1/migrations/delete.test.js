import database from "infra/database.js";
import orcherstrator from "tests/orcherstrator.js";

beforeAll(async () => {
  await orcherstrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
})

test("DELETE deve retornar status 200", async () => {
  const response = await getResponseApi(false, 1, "migrations");
  const responseBody = await response.json();

  expect(response.status).toBe(405);
});

async function getResponseApi(body = false, version, enpoint, params = "") {
  if (body) {
    return (await fetch(`http://localhost:3000/api/v${version}/${enpoint}?${params}`, {
      method: "DELETE"
    })).json();
  } else {
    return await fetch(`http://localhost:3000/api/v${version}/${enpoint}?${params}`, {
      method: "DELETE"
    });
  }
}