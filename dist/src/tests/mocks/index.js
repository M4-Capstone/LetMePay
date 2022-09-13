"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockedUserUpdated = exports.mockedUserWithoutRegister = exports.mockedUserWithoutEmail = exports.mockedUserWithoutPassword = exports.mockedUserLogin = exports.mockedUserIncorrectLoginEmail = exports.mockedUserIncorrectLoginPassword = exports.mockedUser = void 0;
exports.mockedUser = {
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
exports.mockedUserIncorrectLoginPassword = {
    email: "felipe@mail.com",
    password: "123456",
};
exports.mockedUserIncorrectLoginEmail = {
    email: "felipe1@mail.com",
    password: "12345",
};
exports.mockedUserLogin = {
    email: "felipe@mail.com",
    password: "12345",
};
exports.mockedUserWithoutPassword = {
    email: "felipe@mail.com",
    password: ""
};
exports.mockedUserWithoutEmail = {
    email: "",
    password: "12345"
};
exports.mockedUserWithoutRegister = {
    email: "enrico8888@mail.com",
    password: "8434734"
};
exports.mockedUserUpdated = {
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
