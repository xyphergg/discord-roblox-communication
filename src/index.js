"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const CustomClient_js_1 = __importDefault(require("./classes/CustomClient.js"));
const Server_js_1 = __importDefault(require("./classes/Server.js"));
const GuildHelper_js_1 = __importDefault(require("./helpers/GuildHelper.js"));
(0, dotenv_1.config)();
let Client = new CustomClient_js_1.default;
let App = new Server_js_1.default;
console.log("yo i started");
App.Init();
Client.Init();
async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
let temporaryBans = new Object();
(async () => {
    while (true) {
        const guilds = await Client.guilds.fetch();
        temporaryBans = {};
        for (const [id, guild] of guilds) {
            console.log(`Loading bans for: ${guild.name}`);
            const bans = await (0, GuildHelper_js_1.default)('get', id, "temporaryBans");
            if (bans) {
                temporaryBans[id] = bans;
            }
        }
        for (const [guildId, users] of Object.entries(temporaryBans)) {
            for (const [userId, unbanTimestamp] of Object.entries(users)) {
                const currentTime = Date.now();
                if (currentTime >= Number(unbanTimestamp)) {
                    const guild = Client.guilds.cache.get(guildId);
                    if (!guild)
                        continue;
                    try {
                        await guild.members.unban(userId);
                        console.log(`Unbanned user ${userId}`);
                        // Remove the user from temporaryBans
                        delete temporaryBans[guildId][userId];
                        await (0, GuildHelper_js_1.default)('delete', guildId, `temporaryBans/${userId}`);
                    }
                    catch (err) {
                        console.error(`Failed to unban ${userId}`, err);
                    }
                }
            }
        }
        await sleep(10000);
    }
    //im not giving you my code ...
})();
