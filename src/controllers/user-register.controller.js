import connection from "../config/database.js";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { SALT } from "../constants/salt.js";

const userRegisterController = (req, res) => {
  try {
    const { name, email, pass } = req.body;

    connection.query(
      "SELECT * FROM users WHERE email = ?",
      email,
      (error, results) => {
        if (error) {
          return res.status(500).send({ errors: [error] });
        } else if (results.length === 0) {
          const id = nanoid();

          connection.query(
            "SELECT * FROM users WHERE id = ?",
            id,
            async (error, results) => {
              if (error) {
                return res.status(500).send({ errors: [error] });
              } else if (results.length === 0) {
                const passHash = await bcrypt.hash(pass, SALT);

                connection.query(
                  "INSERT INTO users SET ?",
                  { id, name, email, pass: passHash },
                  (error, results) => {
                    if (error) {
                      return res.status(500).send({ errors: [error] });
                    } else {
                      return res
                        .status(201)
                        .send({ errors: ["Usuario registrado con éxito."] });
                    }
                  },
                );
              } else if (results[0].id) {
                return res.status(409).send({
                  errors: ["Ya existe un usuario registrado con ese 'id'."],
                });
              } else {
                return res.status(500).send({ errors: [error] });
              }
            },
          );
        } else if (results[0].email) {
          return res.status(409).send({
            errors: ["Ya existe un usuario registrado con ese 'email'."],
          });
        } else {
          return res.status(500).send({ errors: [error] });
        }
      },
    );
  } catch (error) {
    return res.status(500).send({ errors: [error] });
  }
};

export default userRegisterController;
