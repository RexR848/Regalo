// server.js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World desde Render 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
