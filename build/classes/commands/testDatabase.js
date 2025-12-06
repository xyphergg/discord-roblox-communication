"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = __importDefault(require("../../enum/Category"));
const Command_1 = __importDefault(require("../Command"));
const discord_js_1 = require("discord.js");
const GuildHelper_1 = __importDefault(require("../../helpers/GuildHelper"));
class Test extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "test",
            description: "send a message to the database for testing",
            category: Category_1.default.Utilities,
            dm_permission: true,
            default_member_permissions: discord_js_1.PermissionFlagsBits.ManageRoles,
            options: [
                {
                    name: "field",
                    description: "field description",
                    type: discord_js_1.ApplicationCommandOptionType.String,
                    required: true,
                }
            ]
        });
    }
    async Execute(interaction) {
        if (!interaction.options.getString("field", true))
            return;
        if (!interaction || !interaction.guildId)
            return;
        let info = await (0, GuildHelper_1.default)(interaction.guildId, interaction.options.getString("field", true));
        console.log(info);
        interaction.reply({ content: `Recieved from firebase for field ${interaction.options.getString("field", true)}: ${info}` });
    }
}
exports.default = Test;
