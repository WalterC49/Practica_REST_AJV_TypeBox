import connection from "../config/database.js";
import bcrypt from "bcryptjs";
import { SALT } from "./../constants/salt.js";

const userUpdateController = (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, oldPass, newPass } = req.body;

    connection.query(
      "SELECT * FROM users WHERE id = ?",
      id,
      async (error, results) => {
        if (error) {
          return res.status(500).send({ errors: [error] });
        } else if (results.length === 0) {
          return res.status(401).send({ errors: ["Usuario no autorizado."] });
        } else {
          if (!results[0].id === id) {
            return res.status(401).send({ errors: ["Usuario no autorizado."] });
          } else if (!(await bcrypt.compare(oldPass, results[0].pass))) {
            return res.status(401).send({ errors: ["Usuario no autorizado."] });
          } else {
            const hashPass = await bcrypt.hash(newPass, SALT);
            connection.query(
              "UPDATE users SET ? WHERE id = ?",
              [{ name, email, pass: hashPass }, id],
              (error, results) => {
                if (error) {
                  return res.status(500).send({ errors: [error] });
                } else {
                  return res.send("Usuario actualizado.");
                }
              },
            );
          }
        }
      },
    );
  } catch (error) {
    return res.status(500).send({ errors: [error] });
  }
};

export default userUpdateController;
