import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
import {
  mockedUser,
  mockedUserIncorrectLoginPassword,
  mockedUserIncorrectLoginEmail,
  mockedUserLogin,
  mockedUserWithoutEmail,
  mockedUserWithoutPassword,
  mockedUserWithoutRegister,
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

  test("POST /login - Should be able to login with the user", async () => {
    const response = await request(app).post("/login").send(mockedUserLogin);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

   test("POST /login - Should not be able to login with the user with incorrect password", async() => {
			const response = await request(app).post('/login').send(mockedUserIncorrectLoginPassword)

			expect(response.body).toHaveProperty("message");
			expect(response.statusCode).toBe(401)

	});

  test("POST /login - Should not be able to login with the user with incorrect email", async() => {
    const response = await request(app).post('/login').send(mockedUserIncorrectLoginEmail)

    expect(response.body).toHaveProperty("message");
    expect(response.statusCode).toBe(401)
  });


  test("POST /login - Should not be able to login without field password", async() => {
    const response = await request(app).post('/login').send(mockedUserWithoutPassword);

    expect(response.body).toHaveProperty("message");
    expect(response.statusCode).toBe(400);
  });

  test("POST /login - Should not be able to login without field email", async() => {
    const response = await request(app).post('/login').send(mockedUserWithoutEmail);

    expect(response.body).toHaveProperty("message");
    expect(response.statusCode).toBe(400);
  });

  test("POST /login - Should not be able to login without register", async() => {
    const response = await request(app).post('/login').send(mockedUserWithoutRegister);

    expect(response.body).toHaveProperty("message");
    expect(response.statusCode).toBe(401);
  })

  afterAll(async () => {
    await connection.destroy();
  });
});
