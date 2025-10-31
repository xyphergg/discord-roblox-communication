// index.js
import express from "express";
import fetch from "node-fetch";
import { Client, GatewayIntentBits, Routes } from "discord.js";
import { config } from "dotenv";
import { REST } from "@discordjs/rest";
import cors from "cors";

config();

const app = express();
app.use(express.json());

// Disable browser CORS requests
app.use(cors({ origin: false }));

let latestCommand = null;

// === Middleware: Check Secret Token ===
function checkApiSecret(req, res, next) {
  const token = req.headers['x-api-key']; // Bot/Game must send this header
  if (token !== process.env.API_SECRET) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
}

// === Express API ===

// Receives new commands from Discord bot
app.post("/command", checkApiSecret, (req, res) => {
  latestCommand = req.body;
  console.log("New command:", latestCommand);
  res.sendStatus(200);
});

// Roblox calls this every few seconds
app.get("/latest", checkApiSecret, (req, res) => {
  res.json(latestCommand || {});
  latestCommand = null;
});

// === Discord Bot ===
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

// Define slash command
const commands = [
  {
    name: "print",
    description: "Print a message to the console",
    options: [
      {
        name: "message",
        description: "The message to print",
        type: 3,
        required: true,
      },
    ],
  },
];

// Register slash commands
(async () => {
  try {
    console.log("Registering slash commands...");
    await rest.put(
      Routes.applicationCommands("1433130963105349773"),
      { body: commands }
    );
    console.log("Commands registered.");
  } catch (err) {
    console.error(err);
  }
})();

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "print") {
    const message = interaction.options.getString("message");

    // Send to bridge
    latestCommand = { command: "print", message };

    await interaction.reply(`✅ Sent message to Roblox: ${message}`);
  }
});

client.once("ready", () => console.log(`✅ Logged in as ${client.user.tag}`));
client.login(process.env.DISCORD_TOKEN);

// === Start the bridge server ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bridge running on port ${PORT}`));
