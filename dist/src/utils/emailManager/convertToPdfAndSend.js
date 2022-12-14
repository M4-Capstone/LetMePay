"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = __importStar(require("nodemailer"));
const pdf = require("pdf-creator-node");
const ejs = __importStar(require("ejs"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
require("dotenv/config");
const acceptedTypeFormat = ["deposit", "transfer", "withdraw"];
const sendReceiptToClientEmail = (transactionType, transaction, clientEmail, author) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!acceptedTypeFormat.includes(transactionType)) {
            throw new Error("transactionType format invalid");
        }
        const filepath = path.resolve(__dirname, transactionType + ".ejs");
        const ejsModel = fs.readFileSync(filepath).toString();
        const ejsData = ejs.render(ejsModel, { transaction });
        const options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm",
        };
        const document = {
            html: ejsData,
            data: {
                transaction,
            },
            path: "./output.pdf",
            type: "stream",
        };
        return yield pdf.create(document, options).then((response) => {
            return new Promise((res, rej) => {
                const transporter = nodemailer.createTransport({
                    host: "smtp-mail.outlook.com",
                    port: 587,
                    secure: false,
                    requireTLS: true,
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASS,
                    },
                });
                const mailOptions = {
                    from: process.env.SMTP_USER,
                    to: clientEmail,
                    subject: `Let Me Pay - Aqui est?? seu comprovante do dia ${new Date()}`,
                    html: `<h1>${author}, seu comprovante chegou! </h1>
                <p>Voc?? est?? recebendo o comprovante da opera????o realizada pelo 
                internet banking no anexo deste email.</p>
                <p>Esta ?? uma mensagem autom??tica e n??o deve ser respondida.</p>
                <br>
                <br>
                <strong><p>Esse documento faz parte de um trabalho acad??mico e suas proced??ncias s??o
                de natureza fict??cia.</p></strong>`,
                    attachments: [
                        {
                            contentType: "application/pdf",
                            filename: "comprovante.pdf",
                            path: response.path,
                        },
                    ],
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        // return console.log(
                        //   "Error during send email process" + error.message
                        // );
                        return rej("error");
                    }
                    console.log("email successfully sent to client: " + clientEmail);
                    res("success");
                });
            });
        });
    }
    catch (err) {
        console.log("Error on convert process: " + err);
    }
});
exports.default = sendReceiptToClientEmail;
