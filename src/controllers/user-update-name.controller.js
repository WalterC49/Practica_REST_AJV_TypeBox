import connection from "../config/database.js";
import bcrypt from "bcryptjs";

const userUpdateNameController = (req, res) => {
  try {
    const { id } = req.params;
    const { name, pass } = req.body;

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
          } else if (!(await bcrypt.compare(pass, results[0].pass))) {
            return res.status(401).send({ errors: ["Usuario no autorizado."] });
          } else {
            connection.query(
              "UPDATE users SET name = ? WHERE id = ?",
              [name, id],
              (error, results) => {
                if (error) return res.status(500).send({ errors: [error] });
                else return res.send("Usuario actualizado.");
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

export default userUpdateNameController;
