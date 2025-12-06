"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = __importDefault(require("../../../enum/Category"));
const Command_1 = __importDefault(require("../../Command"));
const discord_js_1 = require("discord.js");
class unban extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "unban",
            description: "Unban a user",
            category: Category_1.default.Utilities,
            dm_permission: true,
            default_member_permissions: discord_js_1.PermissionFlagsBits.BanMembers,
            options: [
                {
                    name: "identification",
                    description: "Can be a id or a username",
                    type: discord_js_1.ApplicationCommandOptionType.String || discord_js_1.ApplicationCommandOptionType.Number,
                },
            ]
        });
    }
    async Execute(interaction) {
    }
}
exports.default = unban;
