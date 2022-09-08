import { IUserRequest, IUserLogin } from "../../../interfaces/users";

export const mockedUser: IUserRequest = {
    name: "Felipe",
    email: "felipe@mail.com",
    password: "12345",
    documentId: "123456789",
    address: {
        zipCode: "30200-000",
        street: "Rua Olegario",
        number: "30",
        neighborhood: "Centro",
        city: "São Paulo",
        state: "SP"
    }

}

export const mockedUserLogin: IUserLogin = {
    email: "felipe@mail.com",
    password: "12345"
}