"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = __importDefault(require("../../enum/Category"));
const CreateCommand_1 = __importDefault(require("../../helpers/CreateCommand"));
const Command_1 = __importDefault(require("../Command"));
const discord_js_1 = require("discord.js");
class print extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "print",
            description: "print to the thingy!",
            category: Category_1.default.Utilities,
            dm_permission: true,
            default_member_permissions: discord_js_1.PermissionFlagsBits.ManageRoles,
            options: [
                {
                    name: "message",
                    description: "The message to print",
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    required: true,
                },
            ]
        });
    }
    async Execute(interaction) {
        const message = interaction.options.getString("message");
        if (!message)
            return;
        let data = {
            message: message
        };
        (0, CreateCommand_1.default)("print", data);
        await interaction.reply(`Print command executed! **${message}**`);
    }
}
exports.default = print;
