


<p align="center">
<img src="https://img.shields.io/badge/Tech-JavaScript%20%20%20%20%20%20%20-yellow">
<img src="https://img.shields.io/badge/Tech-TypeScript-blue">
<img src="https://img.shields.io/badge/Tech-Express-lightgrey">
<img src="https://img.shields.io/badge/Tech-Node.js-lightgrey">
</p>



# API LetMePay

Atualmente várias instituições de pagamento fazem transferências, 
porém as mesmas não enviam o comprovante tanto de envio como de recebimento após
a confirmação da transferência deixando o usuário compartilhar através da aplicação, mediante isso
surgiu a ideia do **LetMePay** que é uma instituição de pagamento focado na experiência do 
usuário que está sempre ouvindo seus clientes e procurando as melhorias necessárias para 
melhor experiência do usuário. A **LetMePay** contém um sistema avançado que notifica os envolvidos 
sobre a transferência após a mesma ser confirmada. 

## Features: 

-  Cadastro de usuário  

-   Autenticação 

-  Funções de depositar quantidade de dinheiro 

- Função de transferir dinheiro para conta de usuário 

- Mandar para email o comprovante de transação 

**[Documentação do projeto](https://letmepaydoc.vercel.app/#req_45c188006800487cb3f272b7b76b033d)**

**Rota :** `https://letmepaycapstone.herokuapp.com/`


#### Endpoints do serviço:


| Método | Endpoint     | Responsabilidade                |
| :-------- | :------- | :------------------------- |
| **POST** |`/users` | Criar conta |
| **POST** |`/login` | Login de usuário |
| **POST** |`/categories ` | Criar categoria* |
| **POST** |`/transactions/transfer ` | Transferir dinheiro para outro usuário* |
| **PATCH** |`/users ` | Editar usuário* |
| **DELETE** |`/users ` | Deletar usuário* |
| **POST** |`/transactions/deposit ` | Depositar dinheiro* |
| **POST** |`/transactions/withdraw ` | Sacar dinheiro* |
| **GET** |`/profile` | Obter usuário logado* |
| **GET** |`/profile/:keyword` | Obter usuário por keyword(email, cpf ou nome)* |
| **GET** |`/history` | Obter todas as transações* |
| **GET** |`/history/:type` | Obter transações de um tipo(tf, wd, dp)* |
| **GET** |` /history/transaction/:id` | Obter uma transação* |

 `* As rotas precisam de um token de autenticação`
