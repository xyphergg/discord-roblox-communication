"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = __importDefault(require("../../enum/Category"));
const Command_1 = __importDefault(require("../Command"));
const discord_js_1 = require("discord.js");
class createReaction extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "reactionmessage",
            description: "Creates a reaction in the channel you are talking to, this is used to purge inactive testers.",
            category: Category_1.default.Utilities,
            dm_permission: false,
            default_member_permissions: discord_js_1.PermissionFlagsBits.ManageRoles,
            options: [
                {
                    name: "role",
                    description: "The role to ping",
                    type: discord_js_1.ApplicationCommandOptionType.Role,
                    required: true,
                },
            ]
        });
    }
    async Execute(interaction) {
        let channelid = interaction.channelId;
        if (!channelid)
            return console.log("Couldn't find channel id");
        let role = interaction.options.getRole("role", false);
        if (!role)
            return;
        let channel = await interaction.client.channels.fetch(channelid);
        if (!channel)
            return;
        interaction.reply({ content: "Creating reaction message..", flags: ["Ephemeral"] });
        let message = await channel.send({ content: "This is an activity reaction poll, if you do not react to it you'll be removed." });
        await channel.send({ content: `${role}` });
        message.react('✅');
    }
}
exports.default = createReaction;
