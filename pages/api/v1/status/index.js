import database from "infra/database";

async function status(request, response) {

  // Pegar a data atual no formato ISO 8601
  const updatedAt = new Date().toISOString();

  // Pegar a versão do banco de dados 
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  // Pegar o maximo de conexões do banco de dados
  const databaseMaxConnectionsResult = await database.query("SHOW max_connections;");
  const databaseMaxConnectionsValue = databaseMaxConnectionsResult.rows[0].max_connections;

  // pegar as conexões ativas
  const databaseName = process.env.POSTGRES_DB;
  const activeConnectionsResult = await database.query({
    text: `
        SELECT count(*)::int 
        FROM pg_stat_activity 
        WHERE datname = $1;
        `,
    values: [databaseName],
  },
  );
  const activeConnectionsValue = activeConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        active_connections: activeConnectionsValue,
      }
    }
  });
}

export default status;