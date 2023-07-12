import connection from "../config/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userLoginController = (req, res) => {
  try {
    const { email, pass } = req.body;

    connection.query(
      "SELECT * FROM users WHERE email = ?",
      email,
      async (error, results) => {
        if (error) {
          return res.status(500).send({ errors: [error] });
        } else if (results.length === 0) {
          return res
            .status(401)
            .send({ errors: ["Credenciales incorrectas."] });
        } else if (!(await bcrypt.compare(pass, results[0].pass))) {
          return res
            .status(401)
            .send({ errors: ["Credenciales incorrectas."] });
        } else {
          const token = jwt.sign(
            { id: results[0].id },
            process.env.JWT_PRIVATE_KEY,
          );
          res.send(token);
        }
      },
    );
  } catch (error) {
    return res.status(500).send("Error: " + error);
  }
};

export default userLoginController;
