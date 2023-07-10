import connection from "../config/database.js";
import bcrypt from "bcryptjs";

const userDeleteController = (req, res) => {
  try {
    const { id } = req.params;
    const { pass } = req.body;

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
            console.log(results);
            return res.status(401).send("Usuario no autorizado1.");
          } else if (!(await bcrypt.compare(pass, results[0].pass))) {
            return res.status(401).send("Usuario no autorizado2.");
          } else {
            connection.query(
              "DELETE FROM users WHERE id = ?",
              id,
              (error, results) => {
                if (error) return res.status(500).send("Error: " + error);
                else return res.send("Usuario eliminado.");
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

export default userDeleteController;
