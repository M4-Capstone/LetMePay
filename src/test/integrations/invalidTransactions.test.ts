import { DataSource } from 'typeorm'
import AppDataSource from '../../data-source'
import request from 'supertest'
import app from '../../app'
import {
	mockedUser,
	mockedUserLogin,
	mockedUserReceiver,
	mockedInvalidTransactionDeposit,
	mockedInvalidTransactionTransfer,
	mockedInvalidTransactionWithdraw,
	mockedTransactionTransfer,
	mockedTransactionWithdraw,
	mockedTransactionDeposit2,
	mockedInvalidTransferId,
} from '../mocks'

let userSenderCreated
let userReceiverCreated
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

	// deposito sem autenticacao
	test('POST /transactions -  Must be able to create a deposite transaction', async () => {
		const response = await request(app)
			.post('/transactions/:type') // parametro de rota a decidir
			.send(mockedInvalidTransactionDeposit)
		expect(response.status).toBe(401)
		expect(response.body).toHaveProperty('message')
		expect(response.body).toHaveProperty('status')
		expect(response.body.message).toBe('')
		expect(response.body.status).toBe('')
	})

	// saque sem autenticacao
	test('POST /transactions -  Must be able to create a withdraw transaction', async () => {
		const response = await request(app)
			.post('/transactions/:type') // parametro de rota a decidir
			.send(mockedInvalidTransactionWithdraw)
		expect(response.status).toBe(401)
		expect(response.body).toHaveProperty('message')
		expect(response.body).toHaveProperty('status')
		expect(response.body.message).toBe('')
		expect(response.body.status).toBe('')
	})

	// transferencia sem autenticacao
	test('POST /transactions -  Must be able to create a transfer transaction', async () => {
		const response = await request(app)
			.post('/transactions/:type') // parametro de rota a decidir
			.send(mockedInvalidTransactionTransfer)
		expect(response.status).toBe(401)
		expect(response.body).toHaveProperty('message')
		expect(response.body).toHaveProperty('status')
		expect(response.body.message).toBe('')
		expect(response.body.status).toBe('')
	})

	test('POST /users - should be able to create an User', async () => {
		userSenderCreated = await request(app).post('/users').send(mockedUser)
	})

	test('POST /login - should be able to create session', async () => {
		token = await request(app).post('/login').send(mockedUserLogin)
	})

	test('POST /users - should be able to create an User', async () => {
		userReceiverCreated = await request(app)
			.post('/users')
			.send(mockedUserReceiver)
	})

	// deposito no valor de 0 reais
	test('POST /transactions -  Must be able to create a deposite transaction', async () => {
		const response = await request(app)
			.post('/transactions/:type') // parametro de rota a decidir
			.set('Authorization', `Bearer ${token}`)
			.send(mockedInvalidTransactionDeposit)

		expect(response.status).toBe(401)
		expect(response.body).toHaveProperty('message')
		expect(response.body).toHaveProperty('status')
		expect(response.body.message).toBe('')
		expect(response.body.status).toBe('')
	})

	// saque no valor de 0 reais
	test('POST /transactions -  Must be able to create a withdraw transaction', async () => {
		const response = await request(app)
			.post('/transactions/:type') // parametro de rota a decidir
			.set('Authorization', `Bearer ${token}`)
			.send(mockedInvalidTransactionWithdraw)
		expect(response.status).toBe(401)
		expect(response.body).toHaveProperty('message')
		expect(response.body).toHaveProperty('status')
		expect(response.body.message).toBe('')
		expect(response.body.status).toBe('')
	})

	// transferencia no valor de 0 reais
	test('POST /transactions -  Must be able to create a transfer transaction', async () => {
		const response = await request(app)
			.post('/transactions/:type') // parametro de rota a decidir
			.set('Authorization', `Bearer ${token}`)
			.send(mockedInvalidTransactionTransfer)
		expect(response.status).toBe(401)
		expect(response.body).toHaveProperty('message')
		expect(response.body).toHaveProperty('status')
		expect(response.body.message).toBe('')
		expect(response.body.status).toBe('')
	})
})

test('POST /transactions -  Must be able to create a deposite transaction', async () => {
	const response = await request(app)
		.post('/transactions/:type') // parametro de rota a decidir
		.set('Authorization', `Bearer ${token}`)
		.send(mockedTransactionDeposit2)
})

// saque com um valor maior do que o valor em conta
test('POST /transactions -  Must be able to create a withdraw transaction', async () => {
	const response = await request(app)
		.post('/transactions/:type') // parametro de rota a decidir
		.set('Authorization', `Bearer ${token}`)
		.send(mockedTransactionWithdraw)
	expect(response.status).toBe(401)
	expect(response.body).toHaveProperty('message')
	expect(response.body).toHaveProperty('status')
	expect(response.body.message).toBe('')
	expect(response.body.status).toBe('')
})

// transferencia com um valor maior do que o valor em conta
test('POST /transactions -  Must be able to create a transfer transaction', async () => {
	const response = await request(app)
		.post('/transactions/:type') // parametro de rota a decidir
		.send(mockedTransactionTransfer)
	expect(response.status).toBe(401)
	expect(response.body).toHaveProperty('message')
	expect(response.body).toHaveProperty('status')
	expect(response.body.message).toBe('')
	expect(response.body.status).toBe('')
})

// transferencia para um usuario inexistente
test('POST /transactions -  Must be able to create a transfer transaction', async () => {
	const response = await request(app)
		.post('/transactions/:type') // parametro de rota a decidir
		.send(mockedInvalidTransferId)
	expect(response.status).toBe(401)
	expect(response.body).toHaveProperty('message')
	expect(response.body).toHaveProperty('status')
	expect(response.body.message).toBe('')
	expect(response.body.status).toBe('')
})

/*
	Testes de ERRO
		usuario nao pode ser possibilitado fazer operacoes com valores menores que 1 real nas 3 types
		usuario nao pode sacar ou transferir valores maiores do qual o valor de sua carteira
		transferencias sem autenticacao
		transferencias para outro usuario que nao existe
*/
