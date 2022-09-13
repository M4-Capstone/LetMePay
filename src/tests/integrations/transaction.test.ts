import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
import {
  mockedInvalidTransactionDeposit,
  mockedInvalidTransactionDepositByReceiver,
  mockedInvalidTransactionTransferByAmount,
  mockedInvalidTransactionTransferByReceiver,
  mockedInvalidTransactionTransferBySender,
  mockedInvalidTransactionWithdraw,
  mockedInvalidTransactionWithdrawByReceiver,
  mockedTransactionDeposit,
  mockedTransactionDeposit2,
  mockedTransactionTransfer,
  mockedTransactionWithdraw,
  mockedUser,
  mockedUserLogin,
  mockedUserReceiverOnTransfer,
} from "../mocks/transactionMocks";

let token: any;
let userReceiverCreatedforTransfer: any;
let userCreated: any;

describe("/transactions", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.log("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /users - should be able to create an User", async () => {
    const response = await request(app).post("/users").send(mockedUser);
    userCreated = response.body;
  });
  test("POST /login - should be able to create session", async () => {
    const res = await request(app).post("/login").send(mockedUserLogin);
    token = res.body.token;
  });

  test("POST /users - should be able to create an user for transfer transaction", async () => {
    const res = await request(app)
      .post("/users")
      .send(mockedUserReceiverOnTransfer);
    userReceiverCreatedforTransfer = res.body;
  });

  test("creating transactions types", async () => {
    await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ type: "dp" });
    await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ type: "tf" });
    await request(app)
      .post("/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ type: "wd" });
  });

  test("POST /transactions -  Must be able to create a deposit transaction", async () => {
    const response = await request(app)
      .post("/transactions/deposit")
      .set("Authorization", `Bearer ${token}`)
      .send(mockedTransactionDeposit);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("status");
    expect(response.body.message).toEqual(
      "Deposit transaction successfully created"
    );
    expect(response.body.status).toEqual("Receipt sent to customers email");
  });

  test("POST /transactions -  Must be able to create a withdraw transaction", async () => {
    const response = await request(app)
      .post("/transactions/withdraw")
      .set("Authorization", `Bearer ${token}`)
      .send(mockedTransactionWithdraw);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("status");
    expect(response.body.message).toEqual(
      "Withdraw transaction successfully created"
    );
    expect(response.body.status).toEqual("Receipt sent to customers email");
  });

  test("POST /transactions -  Must be able to create a transfer transaction", async () => {
    const response = await request(app)
      .post("/transactions/transfer")
      .set("Authorization", `Bearer ${token}`)
      .send(mockedTransactionTransfer);
    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("status");
    expect(response.body.message).toEqual(
      "Transfer transaction successfully created"
    );
    expect(response.body.status).toEqual("Receipt sent to customers email");
    expect(response.status).toBe(200);
  });

  test("POST /transactions -  Trying to create a deposit transaction without authentication token", async () => {
    const response = await request(app)
      .post("/transactions/deposit")
      .send(mockedInvalidTransactionDeposit);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("POST /transactions -  Trying to create a withdraw transaction without authentication token", async () => {
    const response = await request(app)
      .post("/transactions/withdraw")
      .send(mockedInvalidTransactionWithdraw);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /transactions -  Trying to create a transfer transaction without authentication token", async () => {
    const response = await request(app)
      .post("/transactions/transfer")
      .send(mockedTransactionTransfer);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("POST /transactions -  Trying to create a invalid deposit transaction by invalid amount", async () => {
    const response = await request(app)
      .post("/transactions/deposit")
      .set("Authorization", `Bearer ${token}`)
      .send(mockedInvalidTransactionDeposit);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Amount not allowed");
  });

  test("POST /transactions -  Trying to create a invalid withdraw transaction by invalid amount", async () => {
    const response = await request(app)
      .post("/transactions/withdraw")
      .set("Authorization", `Bearer ${token}`)
      .send(mockedInvalidTransactionWithdraw);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Amount not allowed");
  });

  test("POST /transactions -  Trying to create a invalid transfer transaction by invalid amount", async () => {
    mockedTransactionTransfer.amount = 0;
    const response = await request(app)
      .post("/transactions/transfer")
      .set("Authorization", `Bearer ${token}`)
      .send(mockedTransactionTransfer);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /transactions -  Trying to create a invalid deposit transaction by different documentID", async () => {
    const response = await request(app)
      .post("/transactions/deposit")
      .set("Authorization", `Bearer ${token}`)
      .send(mockedInvalidTransactionDepositByReceiver);

    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("The wallet does not belong to this user");
    expect(response.status).toBe(403);
  });

  test("POST /transactions -  Trying to create a invalid withdraw transaction by different documentID", async () => {
    const response = await request(app)
      .post("/transactions/deposit")
      .set("Authorization", `Bearer ${token}`)
      .send(mockedInvalidTransactionWithdrawByReceiver);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("The wallet does not belong to this user");
  });

  test("POST /transactions -  Create a deposite transaction for next tests", async () => {
    await request(app)
      .post("/transactions/deposit")
      .set("Authorization", `Bearer ${token}`)
      .send(mockedTransactionDeposit2);
  });

  test("POST /transactions -  Trying to create a withdraw transaction by invalid amount", async () => {
    const response = await request(app)
      .post("/transactions/withdraw")
      .set("Authorization", `Bearer ${token}`)
      .send(mockedInvalidTransactionWithdraw);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /transactions -  Trying to create a transfer transaction by invalid amount", async () => {
    const response = await request(app)
      .post("/transactions/transfer")
      .set("Authorization", `Bearer ${token}`)
      .send(mockedInvalidTransactionTransferByAmount);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("POST /transactions -  Trying to create a transfer transaction by by different documentID", async () => {
    const response = await request(app)
      .post("/transactions/transfer")
      .set("Authorization", `Bearer ${token}`)
      .send(mockedInvalidTransactionTransferByReceiver);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });

  test("POST /transactions -  Trying to create a transfer transaction by sender not found", async () => {
    const response = await request(app)
      .post("/transactions/transfer")
      .set("Authorization", `Bearer ${token}`)
      .send(mockedInvalidTransactionTransferBySender);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(403);
  });
});
