import connection from "../config/database.js";
import bcrypt from "bcryptjs";

const userUpdateController = (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, oldPass, newPass } = req.body;

    connection.query(
      "SELECT * FROM users WHERE id = ?",
      id,
      async (error, results) => {
        if (error) {
          return res.status(500).send("Error: " + error);
        } else if (results.length === 0) {
          return res.status(401).send("Usuario no autorizado.");
        } else {
          if (!results[0].id === id) {
            return res.status(401).send("Usuario no autorizado1.");
          } else if (!(await bcrypt.compare(oldPass, results[0].pass))) {
            return res.status(401).send("Usuario no autorizado2.");
          } else {
            const hashPass = await bcrypt.hash(newPass, 8);
            connection.query(
              "UPDATE users SET ? WHERE id = ?",
              [{ name, email, pass: hashPass }, id],
              (error, results) => {
                if (error) {
                  return res.status(500).send("Error: " + error);
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
    return res.status(500).send("Error: " + error);
  }
};

export default userUpdateController;
