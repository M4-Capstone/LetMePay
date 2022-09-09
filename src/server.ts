import app from "./app";
import AppDataSource from "./data-source";
import 'dotenv/config'

async function initDb() {
  await AppDataSource.initialize()
    .then(() => {
      console.log("[DB] Database started successfully");
    })
    .catch((err) => {
      console.error("[DB] An error ocurred during database initalization", err);
    });

  app.listen(process.env.PORT || 3000, () => {
    console.log("server is running");
  });
}

initDb();
