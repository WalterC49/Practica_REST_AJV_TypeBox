import Ajv from "ajv"; // Sirve para validar schemas
import addErrors from "ajv-errors"; // Agrega errorMessages a la instancia de Ajv
import { Type } from "@sinclair/typebox";
import { nameDTOSchema, passDTOSchema } from "./user.dto-types.js";

// Creo el esquema que quiero validar
const UpdateNameDTOSchema = Type.Object(
  {
    name: nameDTOSchema,
    pass: passDTOSchema,
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "El formato del objeto no es válido",
      required: {
        name: "Debe tener una propiedad 'name'",
        pass: "Debe tener una propiedad 'pass'",
      },
    },
  },
);

const ajv = new Ajv({ allErrors: true });
ajv.addFormat("password", /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/); // le agrego un formato personalizado para 'password'
addErrors(ajv); // le agrego los errors a ajv

const validateSchema = ajv.compile(UpdateNameDTOSchema); // compile crea un validador teniendo en cuenta el schema que se la pasa

// Creo un middleware para validar el objecto/schema que recibo a través del body
const userUpdateNameDTO = (req, res, next) => {
  const isDTOValid = validateSchema(req.body);

  if (!isDTOValid)
    return res.status(400).send({
      errors: validateSchema.errors.map(error => error.message),
    });

  next();
};

export default userUpdateNameDTO;
