import path from "path";

export default module.exports = {
  development: {
    client: "pg",
    connection: {
      user: "postgres",
      password: "1234",
      database: "apimeucep",
    },
    migrations: {
      directory: path.join(__dirname, "migrations"),
    },
  },
};
