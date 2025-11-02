"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Event_js_1 = __importDefault(require("../Event.js"));
class CommandHandler extends Event_js_1.default {
    constructor(client) {
        super(client, {
            name: discord_js_1.Events.InteractionCreate,
            description: "Command handler event",
            once: false,
        });
    }
    async Execute(interaction) {
        if (!interaction.isChatInputCommand())
            return;
        const command = this.client.commands.get(interaction.commandName);
        if (!command)
            return await interaction.reply({ content: "This command does not exist!", ephemeral: true }) && this.client.commands.delete(interaction.commandName);
        try {
            command.Execute(interaction);
        }
        catch (error) {
            console.error(`Error executing command ${interaction.commandName}: ${error}`);
        }
    }
}
exports.default = CommandHandler;
