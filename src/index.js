import latest from "./components/server.js";
import Actions from "./components/actions.js";
import registerBot from "./components/registerBot.js";

const { client, rest } = await registerBot();

client.on("interactionCreate", async (interaction) => Actions.HandleCommand(interaction, latest));