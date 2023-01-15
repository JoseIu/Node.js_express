import dotenv from "dotenv";
import express from "express";
import { users } from "./db.js";

dotenv.config();
const PORT = 3000;
const expressApp = express();
expressApp.use(express.json());

//Obetener los detalles de una cuenta del guid
expressApp.get("/account/:guid", (req, res) => {
  //Filtramos los usuarios que mandaremos por id mediante get
  const { guid } = req.params;
  const user = users.find((user) => user.guid === guid);

  //Si no hay reultado mandaremos un error 404 no se encontro en contenido solicitado
  if (!user) return res.status(404).send();

  //si lo encuentra lo devolvemos
  return res.send(user);
});

//Crear una nueva cuenta
expressApp.post("/account", (req, res) => {
  const { guid, name } = req.body;

  if (!guid || !name) return res.state(400).send();

  const user = users.find((user) => user.guid === guid);

  //Si no hay reultado mandaremos un error 409 conflicto
  if (user) return res.status(409).send();

  users.push({
    guid,
    name,
  });

  return res.send();
});

//Actualizar el nombre de una cuenta
expressApp.patch("/account/:guid", (req, res) => {
  //Filtramos los usuarios que mandaremos por id mediante get
  const { guid } = req.params;
  const { name } = req.body;

  if (!name) return res.status(400).send();
  const user = users.find((user) => user.guid === guid);

  //Si no hay reultado mandaremos un error 404 no se encontro en contenido solicitado
  if (!user) return res.status(404).send();

  user.name = name;

  //si lo encuentra lo devolvemos
  return res.send();
});

//Eliminar cuenta
expressApp.delete("/account/:guid", (req, res) => {
  //Eliminamos el usuarios que mandaremos por id mediante DELETE
  const { guid } = req.params;
  const userIndex = users.findIndex((user) => user.guid === guid);

  //Si no hay reultado mandaremos un error 404 no se encontro en contenido solicitado
  if (userIndex === -1) return res.status(404).send();

  users.splice(userIndex, 1);

  //devolvemos que todo a ido bien
  return res.send();
});

expressApp.listen(PORT, () => {
  console.log(`SERVIDOR LEVANTADO EN EL PUERTO ${PORT}`);
});
