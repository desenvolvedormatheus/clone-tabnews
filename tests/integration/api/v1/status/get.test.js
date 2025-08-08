import orcherstrator from "tests/orcherstrator.js";

beforeAll(async () => {
  await orcherstrator.waitForAllServices();
});

test("Get deve retornar status 200", async () => {
  const response = await getResponseApi(false, 1);
  expect(response.status).toBe(200);
});

test("updated_at deve retornar uma data válida", async () => {
  const responseBody = await getResponseApi(true, 1);
  expect(responseBody.updated_at).toBeDefined();
  const parseUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parseUpdatedAt);
});

test("version do banco de dados deve ser uma string especifica", async () => {
  const responseBody = await getResponseApi(true, 1);
  const dbVersion = "16.0";
  expect(responseBody.dependencies.database.version).toEqual(dbVersion);
});

test("Máximo de conexões deve ser 100", async () => {
  const responseBody = await getResponseApi(true, 1);
  const dbMaxConnections = 100;
  expect(responseBody.dependencies.database.max_connections).toEqual(dbMaxConnections);
});

test("Conexões abertas deve ser 1", async () => {
  const responseBody = await getResponseApi(true, 1);
  const activeConnections = 1;
  expect(responseBody.dependencies.database.active_connections).toEqual(activeConnections);
});

async function getResponseApi(body = false, version, enpoint = "status", params = "") {
  if (body) {
    try {
      return (await fetch(`http://localhost:3000/api/v${version}/${enpoint}?${params}`)).json();
    } catch (error) {
      console.error("Error fetching API response:", error);
    }
  } else {
    try {
      return await fetch(`http://localhost:3000/api/v${version}/${enpoint}?${params}`);
    } catch (error) {
      console.error("Error fetching API response:", error);
    }
  }
}