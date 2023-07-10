import connection from "../config/database.js";

const userGetAllController = (req, res) => {
  try {
    connection.query("SELECT * FROM users", async (error, results) => {
      if (error) {
        return res.status(500).send("Error: " + error);
      } else if (results.length === 0) {
        return res.status(401).send("No hay usuarios en está tabla.");
      } else {
        return res.send(results);
      }
    });
  } catch (error) {
    return res.status(500).send("Error: " + error);
  }
};

export default userGetAllController;
