import Actions from "../../components/actions";

export default function(interaction, latest) {
    const message = interaction.options.getString("message");
    
    Actions.CreateCommand("print", { message });
}
