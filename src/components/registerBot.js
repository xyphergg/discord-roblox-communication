// Create slash commands for the bot
import { REST } from "@discordjs/rest";
import { GatewayIntentBits, Client, Routes } from "discord.js";

const commands = [
  {
    name: "print",
    description: "Print a message to the console",
    options: [
      {
        name: "message",
        description: "The message to print",
        type: 3, // STRING
        required: true,
      },
    ],
  },
  {
    name: "kick",
    description: "Kick a user from the server",
    options: [
      {
        name: "user",
        description: "The user to kick",
        type: 3, // USER
        required: true,
      },
      {
        name: "reason",
        description: "Reason for kicking the user",
        type: 3, // STRING
        required: false,
      },
    ],
  },
];

const registerBot = async () => {

  const client = new Client({ intents: [GatewayIntentBits.Guilds] });
  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN); 

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

  client.once("ready", () => console.log(`✅ Logged in as ${client.user.tag}`));
  client.login(process.env.DISCORD_TOKEN);

  return { client, rest };
};

export default registerBot;