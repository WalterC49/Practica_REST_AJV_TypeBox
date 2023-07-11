import connection from "../config/database.js";

const userProfileController = async (req, res) => {
  const { id } = req;

  connection.query("SELECT * FROM users WHERE id = ?", id, (error, results) => {
    if (error)
      return res
        .status(401)
        .send({ errors: ["Usuario no autorizado4"], error });
    else res.send(results[0]);
  });
};

export default userProfileController;
