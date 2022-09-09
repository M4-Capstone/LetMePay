import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
import { mockedUser } from "../../mocks";

describe("/users", () => {
    let connection: DataSource

    beforeAll(async() => {
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
    })

    test("POST /users - Must be able to create a user", async() => {
        const response = await request(app).post('/users').send(mockedUser)

        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body).toHaveProperty("documentId")
        expect(response.body).toHaveProperty("isActive")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.body).toHaveProperty("address")
        expect(response.body.name).toEqual("Felipe")
        expect(response.body.email).toEqual("felipe@mail.com")
        expect(response.body.documentId).toEqual("123456789")
        expect(response.body.isActive).toEqual(true)
        expect(response.status).toBe(201)
    })

    test("POST /users - should not be able to create a user that already exists", async () => {
        const response = await request(app).post('/users').send(mockedUser)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })

    test("GET /users - Get current user using token", async() => {
        const response = await request(app).get('/users').set("Authorization", `Bearer${"token"}`)
        expect(response.body).toHaveLength(2)        
    })

    test("GET /users - Get without token", async() => {
        const response = await request(app).get('/users').send(mockedUser)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("GET /users - Get user with invalid token", async() => {
        const response = await request(app).get('/users').send(mockedUser);

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
    })

    afterAll(async() => {
        await connection.destroy()
    })
})