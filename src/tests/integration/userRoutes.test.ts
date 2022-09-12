import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import request from "supertest";
import app from "../../app";
import { mockedUser, mockedUserLogin } from "../../mocks";


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
        expect(response.body.name).toEqual(mockedUser.name)
        expect(response.body.email).toEqual(mockedUser.email)
        expect(response.body.documentId).toEqual(mockedUser.documentId)
        expect(response.body.isActive).toEqual(true)
        expect(response.status).toBe(201)
    }) 

      test("POST /users - should not be able to create a user that already exists", async () => {
        const response = await request(app).post('/users').send(mockedUser)

        expect(response.body).toHaveProperty("message")
        expect(response.body).toEqual(
            {"message": "User already exists"}
        )
        expect(response.statusCode).toBe(409)
    })
    
      test("GET /users - Get current user using token", async() => {
        const responseLogin = await request(app).post('/login').send(mockedUserLogin)
        const idUser = mockedUser.documentId
        expect(responseLogin.statusCode).toBe(200)
        expect(responseLogin.body).toHaveProperty("token")
        const token = responseLogin.body.token
        const response = await request(app).get(`/users/${idUser}`).set("Authorization", `Bearer ${token}`)
        
        expect(response.body).toBeInstanceOf(Object)
        expect(response.statusCode).toBe(200) 
    }) 


    test("GET /users - Get user with invalid token", async() => {
        const responseLogin = await request(app).post('/login').send(mockedUserLogin)
        const idUser = mockedUser.documentId
        expect(responseLogin.statusCode).toBe(200)
        expect(responseLogin.body).toHaveProperty("token")
        const tokenIncorrect = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVucmljb0BtYWlsLmNvbSJ9.nMJdHJp27mEYWcOvtlLugwR0RnAhCH841A1gJhFGkHY" //token gerado para verificação de um usuario falso
        const response = await request(app).get(`/users/${idUser}`).set("Authorization", `Bearer ${tokenIncorrect}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    test("DELETE /users/:id - must be able to soft delete user", async() =>{
        await request(app).post("/users").send(mockedUser)

        const loginResponse = await request(app).post("/login").send(mockedUserLogin)
        const userToBeDeleted = await request(app).get("/users").set("Authorization", `Bearer ${loginResponse.body.token}`)

        const response = await request(app).delete(`/users/${userToBeDeleted.body.id}`).set("Authorization", `Bearer ${loginResponse.body.token}`)
        const findUser = await request(app).get("/users").set("Authorization",`Bearer ${loginResponse.body.token}`)

        expect(response.status).toBe(204)
        expect(findUser.body.isActive).toBe(false)
    })
    
  /*   test("DELETE /users/:id - User not found", async() => {
        const responseLogin = await request(app).post('/login').send(mockedUserLogin)
        const token = responseLogin.body.token
        const response = await request(app).delete('/users/123456789').set("Authorization", `Bearer ${token}`)

        expect(response.statusCode).toBe(404)
        expect(response.body).toHaveProperty("message")
    }) */
    
    test("DELETE /users/:id - User is not active", async() => {
        const response = await request(app).delete('/users/id').send(mockedUser)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })
    /*
    test("DELETE /users/:id - Must be able to delete a user", async() => {
        const response = await request(app).delete('/users/:id').send(mockedUser)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(204)
    }) */

    afterAll(async() => {
        await connection.destroy()
    })
})