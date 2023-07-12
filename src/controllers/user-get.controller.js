import connection from "../config/database.js";

const userGetController = (req, res) => {
  try {
    const { id } = req.params;
    connection.query(
      "SELECT * FROM users WHERE id = ?",
      id,
      async (error, results) => {
        if (error) {
          return res.status(500).send({ errors: [error] });
        } else if (results.length === 0) {
          return res
            .status(401)
            .send({ errors: ["No existe un usuario con ese 'id'."] });
        } else {
          return res.send(results[0]);
        }
      },
    );
  } catch (error) {
    return res.status(500).send({ errors: [error] });
  }
};

export default userGetController;
