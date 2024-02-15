const sql = require("mssql");
let poolConnection = null;
let connected = false;

const Connect = async (config) => {
  console.log("Database connecting...");
  if (!connected) {
    poolConnection = await sql.connect(config);
    connected = true;
    console.log("Database connection successful");
    return poolConnection;
  } else {
    console.log(`Not connected to database:`);
    return poolConnection;
  }
};

const Disconnect = async () => {
  console.log('Database connection closing...');
  try {
    if (poolConnection) {
      await poolConnection.close();
      connected = false;
      console.log("Database connection closed");
    }
  } catch (error) {
    console.error(`Error closing database connection: ${error}`);
  }
};

module.exports = { Connect, Disconnect };
