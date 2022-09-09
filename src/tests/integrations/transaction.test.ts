import { DataSource } from 'typeorm'
import AppDataSource from '../../data-source'
import request from 'supertest'
import app from '../../app'
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
	mockedUserReceiver,
} from '../mocks/transactionMocks'

let token: any
let userReceiverCreated
let userCreated

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

	// criacao de deposito
	test('POST /transactions -  Must be able to create a deposite transaction', async () => {
		const response = await request(app)
			.post('/transactions/deposit')
			.set('Authorization', `Bearer ${token}`)
			.send(mockedTransactionDeposit)
		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty('message')
		expect(response.body).toHaveProperty('status')
		expect(response.body.message).toBe('Transaction successfully created')
		expect(response.body.status).toBe('Receipt sent to customers email')
	})

	// criacao de saque
	test('POST /transactions -  Must be able to create a withdraw transaction', async () => {
		const response = await request(app)
			.post('/transactions/withdraw')
			.set('Authorization', `Bearer ${token}`)
			.send(mockedTransactionTransfer)
		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty('message')
		expect(response.body).toHaveProperty('status')
		expect(response.body.message).toBe('Transaction successfully created')
		expect(response.body.status).toBe('Receipt sent to customers email')
	})

	// criacao de transferencia
	test('POST /transactions -  Must be able to create a transfer transaction', async () => {
		const response = await request(app)
			.post('/transactions/transfer')
			.set('Authorization', `Bearer ${token}`)
			.send(mockedTransactionWithdraw)
		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty('message')
		expect(response.body).toHaveProperty('status')
		expect(response.body.message).toBe('Transaction successfully created')
		expect(response.body.status).toBe('Receipt sent to customers email')
	})

	// deposito sem autenticacao
	test('POST /transactions -  Trying to create a deposit transaction without authentication token', async () => {
		const response = await request(app)
			.post('/transactions/deposit')
			.send(mockedInvalidTransactionDeposit)
		expect(response.status).toBe(401)
		expect(response.body).toHaveProperty('message')
		expect(response.body).toHaveProperty('status')
		expect(response.body.message).toBe('Wallet or user not found')
	})

	// saque sem autenticacao
	test('POST /transactions -  Trying to create a withdraw transaction without authentication token', async () => {
		const response = await request(app)
			.post('/transactions/withdraw')
			.send(mockedInvalidTransactionWithdraw)
		expect(response.status).toBe(401)
		expect(response.body).toHaveProperty('message')
		expect(response.body).toHaveProperty('status')
		expect(response.body.message).toBe('Wallet or user not found')
	})

	// transferencia sem autenticacao
	test('POST /transactions -  Trying to create a transfer transaction without authentication token', async () => {
		const response = await request(app)
			.post('/transactions/transfer')
			.send(mockedTransactionTransfer)
		expect(response.status).toBe(401)
		expect(response.body).toHaveProperty('message')
		expect(response.body).toHaveProperty('status')
		expect(response.body.message).toBe('Wallet or user not found')
	})

	// deposito no valor de 0 reais
	test('POST /transactions -  Trying to create a invalid deposite transaction by invalid amount', async () => {
		const response = await request(app)
			.post('/transactions/deposit')
			.set('Authorization', `Bearer ${token}`)
			.send(mockedInvalidTransactionDeposit)

		expect(response.status).toBe(400)
		expect(response.body).toHaveProperty('message')
		expect(response.body).toHaveProperty('status')
		expect(response.body.message).toBe('Amount not allowed')
	})

	// saque no valor de 0 reais
	test('POST /transactions -  Trying to create a invalid withdraw transaction by invalid amount', async () => {
		const response = await request(app)
			.post('/transactions/withdraw')
			.set('Authorization', `Bearer ${token}`)
			.send(mockedInvalidTransactionWithdraw)
		expect(response.status).toBe(401)
		expect(response.body).toHaveProperty('message')
		expect(response.body).toHaveProperty('status')
		expect(response.body.message).toBe('Amount not allowed')
	})

	// transferencia no valor de 0 reais
	test('POST /transactions -  Trying to create a invalid transfer transaction by invalid amount', async () => {
		const response = await request(app)
			.post('/transactions/tranfer')
			.set('Authorization', `Bearer ${token}`)
			.send(mockedInvalidTransactionTransferByAmount)
		expect(response.status).toBe(401)
		expect(response.body).toHaveProperty('message')
		expect(response.body).toHaveProperty('status')
		expect(response.body.message).toBe('Amount not allowed')
	})

	// deposito para conta inexistente
	test('POST /transactions -  Trying to create a invalid deposite transaction by receiver not found', async () => {
		const response = await request(app)
			.post('/transactions/deposit')
			.set('Authorization', `Bearer ${token}`)
			.send(mockedInvalidTransactionDepositByReceiver)

		expect(response.status).toBe(404)
		expect(response.body).toHaveProperty('message')
		expect(response.body).toHaveProperty('status')
		expect(response.body.message).toBe('Wallet or user not found')
	})

	// saque de uma conta inexistente
	test('POST /transactions -  Trying to create a invalid withdraw transaction by receiver not found', async () => {
		const response = await request(app)
			.post('/transactions/deposit')
			.set('Authorization', `Bearer ${token}`)
			.send(mockedInvalidTransactionWithdrawByReceiver)

		expect(response.status).toBe(404)
		expect(response.body).toHaveProperty('message')
		expect(response.body).toHaveProperty('status')
		expect(response.body.message).toBe('Wallet or user not found')
	})

	// deposito
	test('POST /transactions -  Create a deposite transaction for next tests', async () => {
		await request(app)
			.post('/transactions/deposit')
			.set('Authorization', `Bearer ${token}`)
			.send(mockedTransactionDeposit2)
	})

	// saque com um valor maior do que o valor em conta
	test('POST /transactions -  Trying to create a withdraw transaction by invalid amount', async () => {
		const response = await request(app)
			.post('/transactions/withdraw')
			.set('Authorization', `Bearer ${token}`)
			.send(mockedTransactionWithdraw)
		expect(response.status).toBe(401)
		expect(response.body).toHaveProperty(
			'User does not have the money to perform the transaction'
		)
	})

	// transferencia com um valor maior do que o valor em conta
	test('POST /transactions -  Trying to create a transfer transaction by invalid amount', async () => {
		const response = await request(app)
			.post('/transactions/transfer')
			.set('Authorization', `Bearer ${token}`)
			.send(mockedTransactionTransfer)
		expect(response.status).toBe(401)
		expect(response.body).toHaveProperty(
			'User does not have the money to perform the transaction'
		)
	})

	// transferencia para um usuario inexistente
	test('POST /transactions -  Trying to create a transfer transaction by receiver not found', async () => {
		const response = await request(app)
			.post('/transactions/transfer')
			.set('Authorization', `Bearer ${token}`)
			.send(mockedInvalidTransactionTransferByReceiver)
		expect(response.status).toBe(404)
		expect(response.body).toHaveProperty('Wallet or user not found')
	})

	// transferencia de uma origem inexistente
	test('POST /transactions -  Trying to create a transfer transaction by sender not found', async () => {
		const response = await request(app)
			.post('/transactions/transfer')
			.set('Authorization', `Bearer ${token}`)
			.send(mockedInvalidTransactionTransferBySender)
		expect(response.status).toBe(404)
		expect(response.body).toHaveProperty('Wallet or user not found')
	})
})
