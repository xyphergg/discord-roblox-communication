"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const process_1 = __importDefault(require("process"));
const Handler_js_1 = __importDefault(require("./Handler.js"));
class CustomClient extends discord_js_1.Client {
    handler;
    config;
    commands;
    subcommands;
    constructor() {
        super({ intents: [
                discord_js_1.GatewayIntentBits.Guilds,
                discord_js_1.GatewayIntentBits.GuildMessages,
                discord_js_1.GatewayIntentBits.GuildMessageReactions,
                discord_js_1.GatewayIntentBits.MessageContent
            ] });
        const { DISCORD_TOKEN, DISCORD_ID, API_KEY, PORT } = process_1.default.env;
        if (!DISCORD_TOKEN || !API_KEY || !PORT || !DISCORD_ID) {
            throw new Error("Missing required environment variables: TOKEN, API_KEY, PORT");
        }
        this.config = {
            token: DISCORD_TOKEN,
            discordClientId: DISCORD_ID,
            api_key: API_KEY,
            port: Number(PORT),
        };
        this.commands = new discord_js_1.Collection();
        this.subcommands = new discord_js_1.Collection();
        this.handler = new Handler_js_1.default(this);
    }
    Init() {
        this.login(this.config.token)
            .then(() => console.log(`Sucessfully logged in as ${this.user?.tag}`))
            .catch((err) => console.error(`Caught error: ${err}`));
        this.LoadHandlers();
    }
    LoadHandlers() {
        this.handler.LoadEvents();
        this.handler.LoadCommands();
    }
}
exports.default = CustomClient;
