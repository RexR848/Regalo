const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "Public")));

// Conexión MongoDB Atlas (Base Adviento)
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://ruru_racha_user:Zki7p6jxikHlxUFU@racha.hno7fk1.mongodb.net/Adviento?retryWrites=true&w=majority&appName=Racha";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Conectado a MongoDB (Adviento.Data)"))
  .catch(err => console.error("❌ Error en MongoDB:", err));

// --- Esquema Usuario (colección Data) --- //
const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true },  // identificador de usuario
  openedDays: { type: [Number], default: [] }, // días abiertos en el calendario
  tickets: { type: Number, default: 5 },     // tickets de gacha
  codesUsed: { type: [String], default: [] } // códigos ya canjeados
}, { collection: "Data" });

const User = mongoose.model("User", UserSchema);

// --- RUTAS API --- //

// Obtener datos de usuario
app.get("/api/user/:id", async (req, res) => {
  let user = await User.findOne({ userId: req.params.id });
  if (!user) {
    user = new User({ userId: req.params.id });
    await user.save();
  }
  res.json(user);
});

// Abrir un día del calendario
app.post("/api/open-day", async (req, res) => {
  const { userId, day } = req.body;
  let user = await User.findOne({ userId });
  if (!user) user = new User({ userId });

  if (!user.openedDays.includes(day)) {
    user.openedDays.push(day);
  }
  await user.save();
  res.json({ success: true, openedDays: user.openedDays });
});

// Canjear un código
app.post("/api/redeem", async (req, res) => {
  const { userId, code } = req.body;
  let user = await User.findOne({ userId });
  if (!user) user = new User({ userId });

  if (user.codesUsed.includes(code)) {
    return res.json({ success: false, message: "Código ya usado" });
  }

  // Ejemplo: si el código es NAVIDAD10 da 10 tickets
  if (code === "NAVIDAD10") {
    user.tickets += 10;
  }

  user.codesUsed.push(code);
  await user.save();

  res.json({ success: true, tickets: user.tickets });
});

// Usar ticket en el gacha
app.post("/api/gacha", async (req, res) => {
  const { userId } = req.body;
  let user = await User.findOne({ userId });
  if (!user) user = new User({ userId });

  if (user.tickets <= 0) {
    return res.json({ success: false, message: "No tienes tickets" });
  }

  user.tickets -= 1;
  await user.save();

  const recompensa = "🎁 Regalo de prueba"; // luego lo hacemos random

  res.json({ success: true, tickets: user.tickets, reward: recompensa });
});

// --- HTML principal --- //
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Public", "index.html"));
});

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
