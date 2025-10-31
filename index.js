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

let latestCommand = [];

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
  latestCommand.push(req.body);
  console.log("New command:", latestCommand);
  res.sendStatus(200);
});

// Roblox calls this every few seconds
app.get("/latest", checkApiSecret, (req, res) => {
  res.json(latestCommand || {});
  latestCommand = [];
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
    name: "kick",
    description: "Kick a user from the server",
    options: [
      {
        name: "user",
        description: "The user to kick",
        type: 3,
        required: true,
      },
      {
        name: "reason",
        description: "Reason for kicking the user",
        type: 3,
        required: false,
      }
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
    latestCommand.push({ command: "print", message });

    await interaction.reply(`✅ Sent message to Roblox: ${message}`);
  } else if (interaction.commandName === "kick") {
    const user = interaction.options.getString("user");
    const reason = interaction.options.getString("reason") || "No reason provided";

    // Send to bridge
    latestCommand.push({ command: "kick", user, reason });

    await interaction.reply(`✅ Sent kick command to Roblox: ${user} (${reason})`);
  }
});

client.once("ready", () => console.log(`✅ Logged in as ${client.user.tag}`));
client.login(process.env.DISCORD_TOKEN);

// === Start the bridge server ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bridge running on port ${PORT}`));
