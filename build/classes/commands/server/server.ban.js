"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const SubCommand_1 = __importDefault(require("../../SubCommand"));
const ParseDuration_1 = __importDefault(require("../../../helpers/time/ParseDuration"));
const GuildHelper_1 = __importDefault(require("../../../helpers/GuildHelper"));
const formatDuration_1 = __importDefault(require("../../../helpers/time/formatDuration"));
class ban extends SubCommand_1.default {
    constructor(client) {
        super(client, {
            name: "server.ban",
        });
    }
    async Execute(interaction) {
        const User = interaction.options.getMember("user");
        const Reason = interaction.options.getString("reason", false) || "No reason specified";
        const Duration = interaction.options.getString("duration", false);
        const errorEmbed = new discord_js_1.EmbedBuilder().setColor("NotQuiteBlack").setAuthor({ name: "FAILED" });
        if (!interaction.guild?.id)
            return;
        if (!(await interaction.guild.members.fetchMe()).permissions.has(discord_js_1.PermissionFlagsBits.BanMembers, true)) {
            return await interaction.reply({
                embeds: [errorEmbed
                        .setDescription(`> Bot doesn't have ban permissions`)],
                flags: [discord_js_1.MessageFlags.Ephemeral]
            });
        }
        if (!User || !User.id)
            return await interaction.reply({
                embeds: [errorEmbed.setDescription(`> User is not defined.`)],
                flags: [discord_js_1.MessageFlags.Ephemeral]
            });
        if (User.id == interaction.user.id) {
            await interaction.reply({
                embeds: [errorEmbed
                        .setDescription(`> You cannot ban yourself, silly.`)],
                flags: [discord_js_1.MessageFlags.Ephemeral]
            });
            return;
        }
        if (User.roles.highest.position >= interaction.member.roles.highest.position) {
            await interaction.reply({
                embeds: [errorEmbed
                        .setDescription(`> You cannot ban someone with bigger role hierarchy.`)],
                flags: [discord_js_1.MessageFlags.Ephemeral]
            });
            return;
        }
        const GuildURL = interaction.guild?.iconURL() || "https://imgs.search.brave.com/GT1dqnU73YegwpaktY56bhcJQF4OfI1f2C2SHzDEddk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzY2LzFl/L2NmLzY2MWVjZjY2/YmRhNDkxNTBiNDRk/MjVlNDQ0MGUyYmI4/LmpwZw";
        const GuildName = interaction.guild?.name;
        let DurationinMs;
        if (Duration) {
            DurationinMs = (0, ParseDuration_1.default)(Duration);
        }
        else {
            DurationinMs = "Permanent";
        }
        let SentMessage = false;
        try {
            let unixSeconds;
            let ms;
            if (DurationinMs !== "Permanent" && typeof DurationinMs === "number") {
                ms = Date.now() + DurationinMs;
                unixSeconds = Math.floor(ms / 1000);
            }
            await User.send({ embeds: [new discord_js_1.EmbedBuilder()
                        .setAuthor({
                        name: "BANNED",
                    })
                        .setThumbnail(GuildURL)
                        .setDescription(`> You have been banned from **${GuildName}**\n\n> **Reason:** ${Reason}\n> **Unbanned in:** ${DurationinMs === "Permanent" ? "Never" : `<t:${unixSeconds}>`}`)
                        .setColor("#6b0000")
                        .setFooter({
                        text: "Made by xyphergg",
                    })
                        .setTimestamp()
                ] });
            SentMessage = true;
        }
        catch { }
        try {
            let message = await interaction.reply({ embeds: [new discord_js_1.EmbedBuilder()
                        .setAuthor({
                        name: "BANNED",
                    })
                        .setThumbnail(GuildURL)
                        .setDescription(`> Successfully banned user: **${User.user.username}**\n\n> **Reason:** ${Reason}\n> **Duration:** ${DurationinMs === "Permanent" ? "Permanent" : (0, formatDuration_1.default)(DurationinMs)}"\n` + (SentMessage == true ? `> Message sent: ✅` : `> Message sent: ❎`))
                        .setColor("#6b0000")
                        .setFooter({
                        text: "Made by xyphergg",
                    })
                        .setTimestamp()
                ] });
            setTimeout(() => {
                message.delete();
            }, 3000);
        }
        catch {
            let message = await interaction.reply({ embeds: [errorEmbed
                        .setDescription(`> Couldn't ban the user, I might not have the permissions.`)
                ] });
            return;
        }
        if (DurationinMs !== "Permanent") {
            await (0, GuildHelper_1.default)('set', interaction.guildId, `temporaryBans/${User.id}`, DurationinMs + Date.now());
        }
        await User.ban({
            reason: Reason
        });
        console.log(`Banned user ${User.user.username} from guild ${interaction.guild?.name} for reason: ${Reason} with duration: ${DurationinMs}`);
    }
}
exports.default = ban;
