import connection from "../config/database.js";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

const userRegisterController = (req, res) => {
  try {
    const { name, email, pass } = req.body;

    connection.query(
      "SELECT * FROM users WHERE email=?",
      email,
      (error, results) => {
        if (error) {
          return res.status(500).send("Error: " + error);
        } else if (results[0].email) {
          return res
            .status(409)
            .send("Ya existe un usuario registrado con ese email.");
        } else {
          const id = nanoid();

          connection.query(
            "SELECT * FROM users WHERE id=?",
            id,
            async (error, results) => {
              if (error) {
                return res.status(500).send("Error: " + error);
              } else if (results[0].id) {
                return res
                  .status(409)
                  .send("Ya existe un usuario registrado con ese id.");
              } else {
                const passHash = await bcrypt.hash(pass, 8);

                connection.query(
                  "INSERT INTO users SET ?",
                  { id, name, email, pass: passHash },
                  (error, results) => {
                    if (error) {
                      return res.status(500).send("Error: " + error);
                    } else {
                      return res
                        .status(201)
                        .send("Usuario registrado con éxito.");
                    }
                  },
                );
              }
            },
          );
        }
      },
    );
  } catch (error) {
    return res.status(500).send("Error: " + error);
  }
};

export default userRegisterController;
