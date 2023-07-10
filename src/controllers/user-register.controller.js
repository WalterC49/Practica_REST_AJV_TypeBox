import connection from "../config/database.js";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

// Al hacer esto aprendí a no querer usar nunca más el de module de mysql
const userRegisterController = (req, res) => {
  try {
    const { name, email, pass } = req.body;

    connection.query(
      "SELECT * FROM users WHERE email=?",
      email,
      (error, results) => {
        if (error) console.log(error);

        if (results[0]?.email)
          return res
            .status(409)
            .send("Ya existe un usuario con ese email registrado");
        else {
          const id = nanoid();

          connection.query(
            "SELECT * FROM users WHERE id=?",
            id,
            async (error, results) => {
              if (error) console.log(error);

              if (results[0]?.id)
                return res
                  .status(409)
                  .send("Ya existe un usuario con ese id registrado");
              else {
                const passHash = await bcrypt.hash(pass, 8);

                connection.query(
                  "INSERT INTO users SET ?",
                  { id, name, email, pass: passHash },
                  (error, results) => {
                    if (error) console.log(error);
                    return res.status(201).send("Usuario registrado con éxito");
                  },
                );
              }
            },
          );
        }
      },
    );

    /* const passHash = await bcrypt.hash(pass, 8);

    connection.query(
      "INSERT INTO users SET ?",
      { id, name, email, pass: passHash },
      (error, results) => {
        if (error) console.log(error);
        return res.status(201).send("Usuario registrado con éxito");
      },
    ); */
    /* const passHash = await bcrypt.hash(pass, 8);

    connection.query(
      "INSERT INTO users SET ?",
      { id, name, email, pass: passHash },
      (error, results) => {
        if (error) console.log(error);
        return res.status(201).send("Usuario registrado con éxito");
      },
    ); */
    // tira error si el email esta en uso
    /* if (emailIsUsed === email)
      return res
        .status(409)
        .send("Ya existe un usuario con ese email registrado");
 */
    /* 
const { values: idIsUsed } = connection.query(
  "SELECT * FROM users WHERE id=?",
  id,
  (error, results) => {
    if (error) console.log(error);
  },
  );
  
  if (idIsUsed === id)
  return res.status(409).send("Ya existe un usuario con ese id registrado");
  */
  } catch (error) {
    console.log(error);
  }
};
/* 
const userUpdateName = () => {}; // name pass - user patch
const userProfile = () => {}; // user get
const usersGetAll = () => {};
const userDelete = () => {};

// Login
const userLogin = () => {}; // user pass - login post
const userAuthLogin = () => {};
 */
export default userRegisterController;
