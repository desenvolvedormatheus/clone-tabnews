import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === "development" ? false : true,
  })

  try {
    await client.connect()
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  } finally {
    client.end();
  }
}

export default {
  query: query,
};

function getSSLValues() {
  if (process.env.SPOSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    }
  }
  return process.env.NODE_ENV === "development" ? false : true;
}