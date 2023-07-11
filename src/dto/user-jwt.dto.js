import { promisify } from "util";
import jwt from "jsonwebtoken";

const userJWTDTO = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ errors: ["Usuario no autorizado.1"] });
  }

  const token = authorization.split(" ")[1]; // [Bearer, token]
  if (!token) {
    return res.status(401).send({ errors: ["Usuario no autorizado.2"] });
  }

  try {
    const { id } = await promisify(jwt.verify)(
      token,
      process.env.JWT_PRIVATE_KEY,
    );

    req.id = id;

    next();
  } catch (error) {
    return res.status(401).send({ errors: ["Usuario no autorizado3."] });
  }
};

export default userJWTDTO;
