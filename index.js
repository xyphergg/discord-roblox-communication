// index.js
import express from "express";
import fetch from "node-fetch";
import { Client, GatewayIntentBits, Routes } from "discord.js";
import { config } from "dotenv";
import { REST } from "@discordjs/rest";

config();
const app = express();
app.use(express.json());

let latestCommand = null;

// === Express API ===

// Receives new commands from Discord bot
app.post("/command", (req, res) => {
  latestCommand = req.body;
  console.log("New command:", latestCommand);
  res.sendStatus(200);
});

// Roblox calls this every few seconds
app.get("/latest", (req, res) => {
  res.json(latestCommand || {});
  latestCommand = null;
});

// === Discord Bot ===

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

// Define slash command
const commands = [
  {
    name: "givecoins",
    description: "Give coins to a Roblox player",
    options: [
      {
        name: "player",
        description: "Roblox username",
        type: 3,
        required: true,
      },
      {
        name: "amount",
        description: "Number of coins",
        type: 4,
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

  if (interaction.commandName === "givecoins") {
    const player = interaction.options.getString("player");
    const amount = interaction.options.getInteger("amount");

    // Send to bridge
    latestCommand = { command: "givecoins", player, amount };

    await interaction.reply(`✅ Gave ${amount} coins to ${player} in Roblox.`);
  }
});

client.once("ready", () => console.log(`✅ Logged in as ${client.user.tag}`));
client.login(process.env.DISCORD_TOKEN);

// === Start the bridge server ===
app.listen(process.env.PORT || 3000, () =>
  console.log("Bridge running on port", process.env.PORT)
);
