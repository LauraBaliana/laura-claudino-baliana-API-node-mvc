require("dotenv").config();

const express = require("express");
const cors = require("cors");
const usuarioRoutes = require("./routes/usuarioRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/usuarios", usuarioRoutes);

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
