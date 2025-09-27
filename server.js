const express = require("express");
const path = require("path");
const app = express();

console.log("Hello World desde consola 🚀");

// Servir carpeta public
app.use(express.static(path.join(__dirname, "public")));

// Ruta por defecto: enviar index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
const express = require("express");
const path = require("path");
const app = express();

console.log("Hello World desde consola 🚀");

// Servir carpeta public
app.use(express.static(path.join(__dirname, "public")));

// Ruta por defecto: enviar index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
const express = require("express");
const path = require("path");
const app = express();

console.log("Hello World desde consola 🚀");

// Servir carpeta public
app.use(express.static(path.join(__dirname, "public")));

// Ruta por defecto: enviar index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
