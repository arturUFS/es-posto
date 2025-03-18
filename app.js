const express = require("express");
const session = require("express-session");
const app = express();
const routes = require("./routes/index");
//const { Sequelize } = require("sequelize");

require("dotenv").config();

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

app.use("/", routes);
app.use("/assets", express.static("assets"));

const PORT = process.env.PORT || 3000;

const {database} = require("./config/database");
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