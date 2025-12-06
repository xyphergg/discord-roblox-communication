"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Event_js_1 = __importDefault(require("../Event.js"));
class Ready extends Event_js_1.default {
    constructor(client) {
        super(client, {
            name: discord_js_1.Events.ClientReady,
            description: "Ready Event",
            once: true
        });
    }
    async Execute(...args) {
        console.log(`${this.client.user?.tag} is now ready!`);
        const commands = this.GetJson(this.client.commands);
        const rest = new discord_js_1.REST().setToken(this.client.config.token);
        const setCommands = await rest.put(discord_js_1.Routes.applicationCommands(this.client.config.discordClientId), {
            body: commands
        });
    }
    GetJson(commands) {
        const data = [];
        commands.forEach(command => {
            data.push({
                name: command.name,
                description: command.description,
                options: command.options,
                dm_permission: command.dm_permission
            });
        });
        return data;
    }
}
exports.default = Ready;
