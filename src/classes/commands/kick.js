
import Actions from "../../components/actions.js";

export default function(interaction, latest) {
    const user = interaction.options.getString("user");
    const reason = interaction.options.getString("reason") || "No reason provided";
    const message = `Kick user: ${user}, Reason: ${reason}`;

    Actions.CreateCommand("kick", { user, reason });
}