import dotenv from "dotenv";
import express from "express";
import accountRouter from "./routers/account.js";
import authRouter from "./routers/auth.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const expressApp = express();

expressApp.use(express.json());
expressApp.use(express.text());
expressApp.use("/account", accountRouter);
expressApp.use("/auth", authRouter);
expressApp.listen(PORT, () => {
  console.log(`SERVIDOR LEVANTADO EN EL PUERTO ${PORT}`);
});
