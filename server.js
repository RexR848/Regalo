const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Hello World en consola
console.log("Hello World desde el servidor 🚀");

// Servir la carpeta public (donde están tus HTML, CSS y JS)
app.use(express.static(path.join(__dirname, "public")));

// Ruta principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
