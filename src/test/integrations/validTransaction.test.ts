import { DataSource } from 'typeorm'
import AppDataSource from '../../data-source'
import request from 'supertest'
import app from '../../app'
import {
	mockedTransactionDeposit,
	mockedTransactionTransfer,
	mockedTransactionWithdraw,
	mockedUser,
	mockedUserLogin,
	mockedUserReceiver,
} from '../mocks'

let userReceiverCreated
let userCreated
let token: any

describe('/transactions', () => {
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

	test('POST /users - should be able to create an User', async () => {
		userCreated = await request(app).post('/users').send(mockedUser)
	})
	test('POST /login - should be able to create session', async () => {
		token = await request(app).post('/login').send(mockedUserLogin)
	})

	test('POST /users - should be able to create an User', async () => {
		userReceiverCreated = await request(app)
			.post('/users')
			.send(mockedUserReceiver)
	})

	test('POST /transactions -  Must be able to create a deposite transaction', async () => {
		const response = await request(app)
			.post('/transactions/:type') // parametro de rota a decidir
			.set('Authorization', `Bearer ${token}`)
			.send(mockedTransactionDeposit)
		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty('message')
		expect(response.body).toHaveProperty('status')
		expect(response.body.message).toBe('Transaction successfully created')
		expect(response.body.status).toBe('Receipt sent to customers email')
	})

	test('POST /transactions -  Must be able to create a withdraw transaction', async () => {
		const response = await request(app)
			.post('/transactions/:type') // parametro de rota a decidir
			.set('Authorization', `Bearer ${token}`)
			.send(mockedTransactionTransfer)
		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty('message')
		expect(response.body).toHaveProperty('status')
		expect(response.body.message).toBe('Transaction successfully created')
		expect(response.body.status).toBe('Receipt sent to customers email')
	})

	test('POST /transactions -  Must be able to create a transfer transaction', async () => {
		const response = await request(app)
			.post('/transactions/:type') // parametro de rota a decidir
			.set('Authorization', `Bearer ${token}`)
			.send(mockedTransactionWithdraw)
		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty('message')
		expect(response.body).toHaveProperty('status')
		expect(response.body.message).toBe('Transaction successfully created')
		expect(response.body.status).toBe('Receipt sent to customers email')
	})
})
