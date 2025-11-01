


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

        const commandPath = `../classes/commands/${interaction.commandName}.js`;

        console.log("Command Path:", commandPath);
        console.log("Interaction Command Name:", interaction.commandName);

        try {
            const commandModule = await import(commandPath);
            commandModule.default(interaction, latest);
        } catch (error) {
            console.error("Command Service Error:", error);
        }
    },
    GenerateIdentifier: () => {
        const randomId = function(length = 12) {
            return Math.random().toString(36).substring(2, length+2);
        };
        let newId = randomId();
        Keys.find(function(id) {
            return id === newId;
        });

        return newId;
    },
    CreateCommand: (latest, type, data) => {
        let command = { command: type, ...data };
        let id = Actions.GenerateIdentifier();
        command.id = id;
        
        latest.push(command);
        return command;
    }
};

export default Actions;