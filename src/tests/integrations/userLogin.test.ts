import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
import {
  mockedUser,
  mockedUserIncorrectLogin,
  mockedUserLogin,
} from "../mocks/index";

describe("/login", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedUser);
  });

  test("POST /login - should be able to login with the user", async () => {
    const response = await request(app).post("/login").send(mockedUserLogin);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  /* test("POST /login - should not be able to login with the user with incorrect password or email", async() => {
			const response = await request(app).post('/login'). send(mockedUserIncorrectLogin)

			expect(response.body).toHaveProperty("message");
			expect(response.statusCode).toBe(401)

	}) */

  afterAll(async () => {
    await connection.destroy();
  });
});
