"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = __importDefault(require("../../../enum/Category"));
const Command_1 = __importDefault(require("../../Command"));
const discord_js_1 = require("discord.js");
class Setup extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "setup",
            description: "Setup the bot's settings",
            category: Category_1.default.Setup,
            dm_permission: false,
            default_member_permissions: discord_js_1.PermissionFlagsBits.ManageRoles,
            options: [
                {
                    name: "logs",
                    description: "channel to send all the longs into",
                    type: discord_js_1.ApplicationCommandOptionType.Subcommand,
                    options: [
                        {
                            name: "channel",
                            description: "set the channel",
                            type: discord_js_1.ApplicationCommandOptionType.Channel,
                            required: true
                        }
                    ]
                },
            ]
        });
    }
}
exports.default = Setup;
