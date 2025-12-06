"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = __importDefault(require("../../../enum/Category"));
const Command_1 = __importDefault(require("../../Command"));
const discord_js_1 = require("discord.js");
class Server extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "server",
            description: "Server related commands",
            category: Category_1.default.Utilities,
            dm_permission: true,
            default_member_permissions: discord_js_1.PermissionFlagsBits.BanMembers.toString(),
            options: [
                {
                    name: "ban",
                    description: "Ban a user",
                    type: discord_js_1.ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "user",
                            description: "The message to print",
                            type: discord_js_1.ApplicationCommandOptionType.User,
                            required: true,
                        },
                        {
                            name: "reason",
                            description: "Set the reason for the ban",
                            type: discord_js_1.ApplicationCommandOptionType.String,
                            required: false
                        },
                        {
                            name: "duration",
                            description: "Ban duration, e.g., 4d 4m 4s. Leave empty for permanent.",
                            type: discord_js_1.ApplicationCommandOptionType.String,
                            required: false
                        },
                    ]
                },
                // {
                //     name: "temporary",
                //     description: "Temporary ban a user",
                //     type: ApplicationCommandOptionType.Subcommand,
                //     options: [
                //         {
                //             name: "User",
                //             description: "The message to print",
                //             type: ApplicationCommandOptionType.User, 
                //             required: true,
                //         },
                //         {
                //             name: "Duration",
                //             description: "Duration of the unban. Example: 4d 4m 4s (4 days, minutes, seconds)",
                //             type: ApplicationCommandOptionType.String, 
                //             required: true,
                //         },
                //         {
                //             name: "Reason",
                //             description: "Set the reason for the ban",
                //             type: ApplicationCommandOptionType.String,
                //             required: false
                //         },
                //     ]
                // }
            ]
        });
    }
    async Execute(interaction) {
        // const User = interaction.options.getUser("User", true)
        // const Reason = interaction.options.getString("Reason", false) || "No reason specified"
        // if (!User || !User.id) {
        //     const GuildURL =  interaction.guild?.iconURL() || "https://imgs.search.brave.com/GT1dqnU73YegwpaktY56bhcJQF4OfI1f2C2SHzDEddk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzY2LzFl/L2NmLzY2MWVjZjY2/YmRhNDkxNTBiNDRk/MjVlNDQ0MGUyYmI4/LmpwZw"
        //     const GuildName = interaction.guild?.name
        //     return interaction.reply({embeds: [new EmbedBuilder()
        //        .setAuthor({
        //             name: "BANNED",
        //         })
        //         .setThumbnail(GuildURL)
        //         .setDescription(`> You have been banned from **${GuildName}**\n\n> **Reason:** ${Reason}\n> **Duration:** "Permanent"`)
        //         .setColor("#6b0000")
        //         .setFooter({
        //             text: "Made by xyphergg",
        //         })
        //         .setTimestamp()
        //     ], components: []})
        // }
    }
}
exports.default = Server;
