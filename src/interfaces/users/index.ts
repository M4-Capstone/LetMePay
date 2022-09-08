import { IAddress } from '../address'

export interface IUserRequest {
	name: string
	email: string
	password: string
	documentId: string
	address: IAddress
}

export interface IUserLogin {
	email: string
	password: string
}

export interface IUserUpdate{
	name?: string
	email?: string
	password?: string
}
