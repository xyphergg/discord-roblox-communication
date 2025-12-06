"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const SubCommand_1 = __importDefault(require("../../SubCommand"));
class SetupLogs extends SubCommand_1.default {
    constructor(client) {
        super(client, {
            name: "setup.logs",
        });
    }
    async Execute(interaction) {
        const channel = interaction.options.getChannel("channel", true);
        if (channel.type !== discord_js_1.ChannelType.GuildText) {
            interaction.reply({ content: "Channel has to be of type 'GuildText' in order to be set as a logging channel.", flags: [
                    discord_js_1.MessageFlags.Ephemeral
                ] });
            return;
        }
        // if (!channel) {
        //     await interaction.reply({content: `Channel not specified in the slash command, please send the channel.`})
        //     const channel = interaction.channel as TextChannel
        //     try {
        //         const filter: (m: Message) => boolean = (m) => m.author.id === interaction.user.id;
        //         const awaitMessage = await channel!.awaitMessages({
        //             filter: filter,
        //             max: 1,
        //             time: 60_000,
        //             errors: ['time'],
        //         })
        //         // .then((message) => {
        //         //   message = message.first()
        //         // })
        //         const msg = awaitMessage.first()
        //         let thischannel = await interaction.client.channels.fetch(channel.id) as TextChannel
        //         if (!msg) {
        //             let response= await thischannel.send({content: "Canceling"})
        //             setTimeout(() => {
        //                 response.delete()
        //             }, 1000);
        //             return;
        //         }
        //         const mentionedChannel = msg.mentions.channels.first()
        //         if (!mentionedChannel) {
        //             return 
        //         }
        //         let database = globalThis.database.database();
        //         let guildId = interaction.guildId;
        //         await database.ref(`/${guildId}/`).set({
        //             LoggingChannel: mentionedChannel.id
        //         })
        //         await thischannel.send({content: `Succesfully set the logging channel to : ${mentionedChannel}`})
        //     } catch {
        //         let thischannel = await interaction.client.channels.fetch(channel.id) as TextChannel
        //         let response= await thischannel.send({content: "Canceling"})
        //         setTimeout(() => {
        //             response.delete()
        //         }, 1000);
        //     }
        //     return;
        // };
        const channelId = channel.id;
        let database = globalThis.database.database();
        let guildId = interaction.guildId;
        await database.ref(`/${guildId}/`).set({
            LoggingChannel: channelId
        });
        let message = await interaction.reply({ content: `Succesfully set the logging channel to ${channel}` });
        setTimeout(() => {
            message.delete();
        }, 2000);
    }
}
exports.default = SetupLogs;
