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
          return res.status(500).send("Error: " + error);
        } else if (results.length === 0) {
          return res.status(401).send("Usuario no autorizado0.");
        } else {
          if (!results[0].id === id) {
            return res.status(401).send("Usuario no autorizado1.");
          } else if (!(await bcrypt.compare(pass, results[0].pass))) {
            return res.status(401).send("Usuario no autorizado2.");
          } else {
            connection.query(
              "UPDATE users SET name = ? WHERE id = ?",
              [name, id],
              (error, results) => {
                if (error) return res.status(500).send("Error: " + error);
                else return res.send("Usuario actualizado.");
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

export default userUpdateNameController;
