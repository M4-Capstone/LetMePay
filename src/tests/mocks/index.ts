import { IUserRequest, IUserLogin, IUserUpdate } from "../../interfaces/users";

export const mockedUser: IUserRequest = {
  name: "Felipe",
  email: "felipe@mail.com",
  password: "12345",
  documentId: "123456789",
  address: {
    zipCode: "30200000",
    street: "Rua Olegario",
    number: "30",
    neighbourhood: "Centro",
    city: "São Paulo",
    state: "SP",
  },
};
export const mockedUserIncorrectLoginPassword: IUserLogin = {
  email: "felipe@mail.com",
  password: "123456",
};

export const mockedUserIncorrectLoginEmail: IUserLogin = {
  email: "felipe1@mail.com",
  password: "12345",
};

export const mockedUserLogin: IUserLogin = {
  email: "felipe@mail.com",
  password: "12345",
};

export const mockedUserWithoutPassword: IUserLogin = {
  email: "felipe@mail.com",
  password: ""
}

export const mockedUserWithoutEmail: IUserLogin = {
  email: "",
  password: "12345"
}

export const mockedUserWithoutRegister: IUserLogin = {
  email: "enrico8888@mail.com",
  password: "8434734"
}

export const mockedUserUpdated: IUserUpdate = {
  name: "Felipe",
  email: "felipe@mail.com",
  password: "12345",
  documentId: "123456789",
  address: {
    zipCode: "98765432",
    street: "Rua Canario",
    number: "120",
    neighbourhood: "Santo Carlos",
    city: "Belo Horizonte",
    state: "MG",
  },
};