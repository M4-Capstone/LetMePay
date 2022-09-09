import * as nodemailer from "nodemailer";
import * as pdf from "html-pdf";
import * as ejs from "ejs";
import * as fs from "fs";
import * as path from "path";
import "dotenv/config";

const acceptedTypeFormat: string[] = ["deposit", "transfer", "withdraw"];

const sendReceiptToClientEmail = async (
  transactionType: string,
  transaction: any,
  clientEmail: string
) => {
  try {
    if (!acceptedTypeFormat.includes(transactionType)) {
      throw new Error("transactionType format invalid");
    }
    const filepath = path.resolve(__dirname, transactionType + ".ejs");

    const ejsModel = fs.readFileSync(filepath).toString();

    const options: any = { format: "Letter" };

    const ejsData = ejs.render(ejsModel, { transaction });

    return await pdf.create(ejsData, options).toStream((err, response) => {
      if (err) return console.log(err);

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

        const mailOptions: any = {
          from: process.env.SMTP_USER,
          to: clientEmail,
          subject: "Aqui está seu comprovante",
          html: `<h1>${clientEmail}, Seu comprovante chegou! </h1>
                <p>Você está recebendo o comprovante da operação realizada pelo 
                internet banking no anexo deste email.</p>
                <p>Esta é uma mensagem automática e não deve ser respondida.</p>
                <br>
                <br>
                <p>Esse documento faz parte de um trabalho acadêmico e suas procedências são
                de natureza fictícia.</p>`,
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
            return console.log("Error during convert" + error.message);
          }
          console.log("email successfully sent to client: " + clientEmail);
        });
      });
    });
  } catch (err) {
    console.log("Error on convert process: " + err);
  }
};

export default sendReceiptToClientEmail;
