const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const PORT = 3000; // Replit will expose it automatically

// --- Discord Bot Setup ---
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const TOKEN = secrets.Token;
const CHANNEL_ID = "1315007441519247491"; // Where Roblox messages will go

client.login(TOKEN);

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Listen to messages from Discord and forward to Roblox
client.on("messageCreate", async (message) => {
    if (message.channel.id === CHANNEL_ID && !message.author.bot) {
        // You could store messages or call Roblox endpoint here
        console.log(`Discord → Roblox: ${message.author.username}: ${message.content}`);
    }
});

// --- Roblox → Discord Endpoint ---
app.post("/roblox", async (req, res) => {
    const { username, message } = req.body;
    const channel = client.channels.cache.get(CHANNEL_ID);
    if (channel) {
        channel.send(`**${username}**: ${message}`);
    }
    res.sendStatus(200);
});

// Start the web server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
