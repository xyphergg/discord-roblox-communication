import Actions from "../../components/actions.js";

export default function(interaction, latest) {
    const message = interaction.options.getString("message");

    Actions.CreateCommand("print", { message });
}
