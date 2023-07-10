import Ajv from "ajv"; // Sirve para validar schemas
import addErrors from "ajv-errors"; // Agrega errorMessages a la instancia de Ajv
import { Type } from "@sinclair/typebox";
import {
  emailDTOSchema,
  nameDTOSchema,
  passDTOSchema,
} from "./user.dto-types.js";

// Creo el esquema que quiero validar
const RegisterDTOSchema = Type.Object(
  {
    name: nameDTOSchema,
    email: emailDTOSchema,
    pass: passDTOSchema,
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "El formato del objeto no es válido",
    },
  },
);

const ajv = new Ajv({ allErrors: true });
addErrors(ajv); // le agrego los errors a ajv

const validateSchema = ajv.compile(RegisterDTOSchema); // compile crea un validador teniendo en cuenta el schema que se la pasa

// Creo un middleware para validar el objecto/schema que recibo a través del body
const registerValidateSchema = (req, res, next) => {
  const isDTOValid = validateSchema(req.body);

  if (!isDTOValid)
    return res.status(400).send({
      errors: validateSchema.errors.map(error => error.message),
    });

  next();
};

export default registerValidateSchema;
