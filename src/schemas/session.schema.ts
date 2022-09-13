import { IUserLogin } from "../interfaces/users";

import * as yup from "yup";
import { SchemaOf } from "yup";

const sessionSchema: SchemaOf<IUserLogin> = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

export { sessionSchema };
