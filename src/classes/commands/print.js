import Actions from "../../components/actions.js";

export default async function(interaction, latest) {
    const message = interaction.options.getString("message");

    Actions.CreateCommand(latest, "print", { message });
    await interaction.reply(`Print command executed! **${message}**`);
}
