test("Get deve retornar status 200", async () => {
  const response = await getResponseApi(body = false, version = 1, endpoint = "status");
  expect(response.status).toBe(200);
});

async function getResponseApi(body = false, version, enpoint, params = "") {
  if (body) {
    return (await fetch(`http://localhost:3000/api/v${version}/${enpoint}?${params}`)).json();
  } else {
    return await fetch(`http://localhost:3000/api/v${version}/${enpoint}?${params}`);
  }
}