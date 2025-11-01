import latest from "./components/server";
import Actions from "./components/actions";

const { client, rest } = await Actions.CreateBot();

client.on("interactionCreate", async (interaction) => Actions.HandleCommand(interaction, latest));