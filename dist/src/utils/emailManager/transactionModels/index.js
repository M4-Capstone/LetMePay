"use strict";
const transferTransaction = {
    id: "uuid",
    amount: "456.90",
    date: "12 feb 2022",
    hour: "12:40:00",
    sender: {
        name: "Marcelino Augusto da Silva",
    },
    receiver: {
        name: "Mariana Pereira Gonçalves",
    },
};
const depositTransaction = {
    id: "uuid",
    amount: "456.90",
    date: "12 feb 2022",
    hour: "12:40:00",
    receiver: {
        name: "Mariana Pereira Gonçalves",
    },
};
const withdrawTransaction = {
    id: "uuid",
    amount: "456.90",
    date: "12 feb 2022",
    hour: "12:40:00",
    receiver: {
        name: "Mariana Pereira Gonçalves",
    },
};
//Exemplo como deve ser chamado
// await sendReceiptToClientEmail("transfer", transferTransaction, "teste@hotmail.com");
// await sendReceiptToClientEmail("deposit", depositTransaction, "teste@hotmail.com");
// await sendReceiptToClientEmail("withdraw", withdrawTransaction, "teste@hotmail.com");
// "no terceiro argumento é o email de quem executou a operação"
