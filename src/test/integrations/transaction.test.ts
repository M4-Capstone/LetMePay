import { DataSource } from 'typeorm'
import AppDataSource from '../../data-source'
import request from 'supertest'
import app from '../../app'
import { mockedTransaction } from '../mocks'

describe('/users', () => {
	let connection: DataSource

	beforeAll(async () => {
		await AppDataSource.initialize()
			.then((res) => {
				connection = res
			})
			.catch((err) => {
				console.error('Error during Data Source initialization', err)
			})
	})

	afterAll(async () => {
		await connection.destroy()
	})

	test('POST /transactions -  Must be able to create a transaction', async () => {
		const response = await request(app)
			.post('/transactions')
			.send(mockedTransaction)
		expect(response.body).toHaveProperty('categoryTypeId')
		expect(response.body).toHaveProperty('receiverWalletId')
		expect(response.body).toHaveProperty('senderWalletId')
		expect(response.body.amount).toEqual(500)
		expect(response.body.categoryTypeId).toEqual('id')
		expect(response.body.receiverWalletId).toEqual('Gustavo')
		expect(response.body.senderWalletId).toEqual('Marco')
		expect(response.status).toBe(201)
	})
})

test('GET /history -  Must be able to list transactions', async () => {
	// await request(app).post('/users').send(mockedUser)
	// await request(app).post('/login').send(mockedUserLogin)
	// login do usuario e sua respectica autenticacao
	const response = await request(app).get('/transactions/history')
	// .set de autorizacao por token
	expect(response.body).toHaveLength(1)
})
