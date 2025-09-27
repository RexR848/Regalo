const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "Public")));

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://ruru_racha_user:Zki7p6jxikHlxUFU@racha.hno7fk1.mongodb.net/Adviento?retryWrites=true&w=majority&appName=Racha";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error en MongoDB:", err));

// --- MODELOS --- //
const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  openedDays: { type: [Number], default: [] },
  tickets: { type: Number, default: 5 },
  codesUsed: { type: [String], default: [] },
  rewards: { type: [String], default: [] }
}, { collection: "Data" });

const ConfigSchema = new mongoose.Schema({
  type: { type: String, default: "config" },
  advientoStart: Date,
  codes: [{ code: String, action: String, value: Number }],
  gachaPool: [{ name: String, rarity: String }]
}, { collection: "Data" });

const User = mongoose.model("User", UserSchema);
const Config = mongoose.model("Config", ConfigSchema);

// --- HELPERS --- //
async function getConfig() {
  return await Config.findOne({ type: "config" });
}

function calcUnlockedDays(startDate) {
  const today = new Date();
  const diff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  return Array.from({ length: Math.max(0, diff + 1) }, (_, i) => i + 1);
}

// --- RUTAS --- //

// Obtener usuario con días desbloqueados
app.get("/api/user/:id", async (req, res) => {
  const cfg = await getConfig();
  let user = await User.findOne({ userId: req.params.id });
  if (!user) {
    user = new User({ userId: req.params.id });
    await user.save();
  }

  const autoUnlocked = calcUnlockedDays(cfg.advientoStart);
  user.openedDays = [...new Set([...user.openedDays, ...autoUnlocked])];
  await user.save();

  res.json({ user, advientoStart: cfg.advientoStart });
});

// Canjear código
app.post("/api/redeem", async (req, res) => {
  const { userId, code } = req.body;
  const cfg = await getConfig();
  let user = await User.findOne({ userId });
  if (!user) user = new User({ userId });

  if (user.codesUsed.includes(code)) {
    return res.json({ success: false, message: "Código ya usado" });
  }

  const found = cfg.codes.find(c => c.code === code);
  if (!found) {
    return res.json({ success: false, message: "Código inválido" });
  }

  if (found.action === "ticket") {
    user.tickets += found.value;
  } else if (found.action === "unlock") {
    if (!user.openedDays.includes(found.value)) {
      user.openedDays.push(found.value);
    }
  }

  user.codesUsed.push(code);
  await user.save();

  res.json({ success: true, user });
});

// Usar ticket en el gacha
app.post("/api/gacha", async (req, res) => {
  const { userId } = req.body;
  const cfg = await getConfig();
  let user = await User.findOne({ userId });
  if (!user) user = new User({ userId });

  if (user.tickets <= 0) {
    return res.json({ success: false, message: "No tienes tickets" });
  }

  user.tickets -= 1;
  const reward = cfg.gachaPool[Math.floor(Math.random() * cfg.gachaPool.length)];
  user.rewards.push(reward.name);
  await user.save();

  res.json({ success: true, tickets: user.tickets, reward });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
