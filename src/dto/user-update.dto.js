import Ajv from "ajv"; // Sirve para validar schemas
import addErrors from "ajv-errors"; // Agrega errorMessages a la instancia de Ajv
import addFormats from "ajv-formats"; // Permite validar distinos formatos a Ajv
import { Type } from "@sinclair/typebox";
import {
  emailDTOSchema,
  nameDTOSchema,
  passDTOSchema,
} from "./user.dto-types.js";

// Creo el esquema que quiero validar
const UpdateDTOSchema = Type.Object(
  {
    name: nameDTOSchema,
    email: emailDTOSchema,
    oldPass: passDTOSchema,
    newPass: passDTOSchema,
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "El formato del objeto no es válido",
      required: {
        name: "Debe tener una propiedad 'name'",
        email: "Debe tener una propiedad 'email'",
        oldPass: "Debe tener una propiedad 'oldPass'",
        newPass: "Debe tener una propiedad 'newPass'",
      },
    },
  },
);

const ajv = new Ajv({ allErrors: true });
ajv.addFormat("password", /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/); // le agrego un formato personalizado para 'password'
addErrors(ajv); // le agrego los errors a ajv
addFormats(ajv, ["email"]); // si el 2do parametro está vacío, agrega todos los formatos por defecto

const validateSchema = ajv.compile(UpdateDTOSchema); // compile crea un validador teniendo en cuenta el schema que se la pasa

// Creo un middleware para validar el objecto/schema que recibo a través del body
const userUpdateDTO = (req, res, next) => {
  const isDTOValid = validateSchema(req.body);

  if (!isDTOValid)
    return res.status(400).send({
      errors: validateSchema.errors.map(error => error.message),
    });

  next();
};

export default userUpdateDTO;
