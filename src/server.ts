import app from "./app";
import AppDataSource from "./data-source";

async function initDb() {
  await AppDataSource.initialize()
    .then(() => {
      console.log("[DB] Database started successfully");
    })
    .catch((err) => {
      console.log("[DB] An error ocurred during database initalization", err);
    });

  app.listen(3000, () => {
    console.log("server is running");
  });
}

initDb();
