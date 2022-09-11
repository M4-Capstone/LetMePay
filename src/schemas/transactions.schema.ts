import {
  IDepositTransaction,
  IWithdrawTransaction,
  ITransferTransaction,
} from "../interfaces/transactions";

import * as yup from "yup";
import { SchemaOf } from "yup";

const depositSchema: SchemaOf<IDepositTransaction> = yup.object().shape({
  amount: yup.number().required(),
  documentId: yup.string().required(),
  receiverWalletId: yup.string().required(),
});

const withdrawSchema: SchemaOf<IWithdrawTransaction> = yup.object().shape({
  amount: yup.number().required(),
  documentId: yup.string().required(),
  receiverWalletId: yup.string().required(),
});

const transferSchema: SchemaOf<ITransferTransaction> = yup.object().shape({
  amount: yup.number().required(),
  receiverDocumentId: yup.string().required(),
  senderWalletId: yup.string().required(),
  senderDocumentId: yup.string().required(),
});

export { depositSchema, withdrawSchema,transferSchema };
