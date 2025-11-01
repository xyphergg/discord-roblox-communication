
const Keys = []

const Actions = {
    AddNewCommand: (latestCommand, command) => {
        latestCommand.push(command);
        console.log("New command:", latestCommand);
        return latestCommand;
    },
    GetLatestCommands: (latestCommand) => {
        return latestCommand.at(-1) || {};
    },
    HandleCommand: async (interaction, latest) => {
        if (!interaction.isCommand()) return;

        let command = `./classes/commands/${interaction.commandName}`;
        if (command && interaction.commandName) {
            try {
                const commandModule = await import(command);
                commandModule.default(interaction, latest); 
            } catch (error) {
                console.error("Command Service Error:", error);
            }
        }

    // if (interaction.commandName === "print") {
    //     const message = interaction.options.getString("message");

    //     // Send to bridge
    //     latest.push({ command: "print", message });

    //     await interaction.reply(`✅ Sent message to Roblox: ${message}`);
        
    // } else if (interaction.commandName === "kick") {
    //     const user = interaction.options.getString("user");
    //     const reason = interaction.options.getString("reason") || "No reason provided";

    //     // Send to bridge
    //     latest.push({ command: "kick", user, reason });

    //     await interaction.reply(`✅ Sent kick command to Roblox: ${user} (${reason})`);
    // }
    },
    GenerateIdentifier: () => {
        const randomId = function(length = 12) {
            return Math.random().toString(36).substring(2, length+2);
        };
        let newId = randomId();
        existing.find(function(id) {
            return id === newId;
        });

        return newId;
    },
    CreateCommand: (type, data) => {
        let command = { command: type, ...data };
        let id = Actions.GenerateIdentifier();
        command.id = id;
        
        latest.push(command);
        return command;
    }
};

export default Actions;