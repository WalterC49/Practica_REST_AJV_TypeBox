import connection from "../config/database.js";

const userGetAllController = (req, res) => {
  try {
    connection.query("SELECT * FROM users", async (error, results) => {
      if (error) {
        return res.status(500).send({ errors: [error] });
      } else if (results.length === 0) {
        return res
          .status(401)
          .send({ errors: ["No hay usuarios en está tabla."] });
      } else {
        return res.send(results);
      }
    });
  } catch (error) {
    return res.status(500).send({ errors: [error] });
  }
};

export default userGetAllController;
