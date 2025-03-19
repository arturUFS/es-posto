import express from "express";
import session from "express-session";
import router from "./routes/index.js";
import { database } from "./config/database.js";

const app = express();
import "./models/associations.js"

import {config} from "dotenv";
config();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

app.use("/", router);
app.use("/assets", express.static("assets"));

const PORT = process.env.PORT || 3000;

const authDB = async () => {
    try {
        await database.authenticate();
        console.log("Banco de dados sincronizado.");
    } 
    catch (error) {
        console.error("Erro ao sincronizar DB:", error);
    }
};

app.listen(PORT, () => {
    authDB();
    console.log(`Servidor rodando na porta ${PORT}`);
});