import connection from "../config/database.js";

const userGetController = (req, res) => {
  try {
    const { id } = req.params;
    connection.query(
      "SELECT * FROM users WHERE id = ?",
      id,
      async (error, results) => {
        if (error) {
          return res.status(500).send("Error: " + error);
        } else if (results.length === 0) {
          return res.status(401).send("No existe un usuario con ese 'id'.");
        } else {
          return res.send(results);
        }
      },
    );
  } catch (error) {
    return res.status(500).send("Error: " + error);
  }
};

export default userGetController;