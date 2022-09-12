import { IUserRequest, IUserLogin } from "../interfaces/users";

export const mockedUser: IUserRequest = {
    name: "Felipe",
    email: "felipe@mail.com",
    password: "12345",
    documentId: "123456789",
    address: {
        zipCode: "30200-000",
        street: "Rua Olegario",
        number: "30",
        neighbourhood: "Centro",
        city: "São Paulo",
        state: "SP"
    }

}
export const mockedUserIncorrectLogin: IUserLogin = {
    email: "felipe1@mail.com",
    password: "123456"
}

export const mockedUserLogin: IUserLogin = {
    email: "felipe@mail.com",
    password: "12345"
}
