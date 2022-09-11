import { IUserRequest, IUserUpdate } from "../interfaces/users";
import * as yup from "yup";
import { SchemaOf } from "yup";

const newUserSchema: SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  documentId: yup.string().required().max(14),
  address: yup.object({
    zipCode: yup.string().required().max(8),
    street: yup.string().required(),
    number: yup.string().max(6),
    neighbourhood: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required().max(2),
  }),
});

const updateUserSchema: SchemaOf<IUserUpdate> = yup.object().shape({
  name: yup.string(),
  email: yup.string().email(),
  password: yup.string(),
  documentId: yup.string().max(14),
  address: yup.object({
    zipCode: yup.string().required().max(8),
    street: yup.string().required(),
    number: yup.string().max(6),
    neighbourhood: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required().max(2),
  }),
});



export { newUserSchema, updateUserSchema };
