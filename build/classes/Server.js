"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import type { SiteContext } from "../enum/SiteContext.js";
// import type { SiteNext } from "../enum/SiteNext.js";
const Firebase_js_1 = __importDefault(require("./Firebase.js"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
class Server {
    api_key;
    token;
    port;
    latestCommand;
    discordClientId;
    app;
    constructor() {
        const { DISCORD_TOKEN, API_KEY, PORT, DISCORD_ID } = process.env;
        if (!DISCORD_TOKEN || !API_KEY || !PORT || !DISCORD_ID) {
            throw new Error("Missing required environment variables: TOKEN, API_KEY, PORT");
        }
        this.api_key = API_KEY;
        this.token = DISCORD_TOKEN;
        this.discordClientId = DISCORD_ID;
        this.port = Number(PORT);
        this.app = (0, express_1.default)();
        globalThis.app = this.app;
        this.latestCommand = [];
        globalThis.latestCommand = this.latestCommand;
    }
    Init() {
        const CheckApiKey = (req, res, next) => {
            const token = req.headers['x-api-key'];
            if (token !== this.api_key) {
                return res.status(403).json({ error: "Forbidden" });
            }
            next();
        };
        this.app.use(express_1.default.json()).use((0, cors_1.default)({ origin: false }))
            .get('/', CheckApiKey, (eq, res) => {
            res.send('Welcome to the Discord-Roblox Communication Server!');
        })
            .get('/ping', CheckApiKey, (req, res) => {
        })
            .post("/command", CheckApiKey, (req, res) => {
            this.latestCommand.push(req.body);
            console.log("New command:", this.latestCommand);
            res.sendStatus(200);
        })
            .get("/latest", CheckApiKey, (req, res) => {
            res.json(this.latestCommand);
        })
            .delete("/exec", CheckApiKey, (req, res) => {
            let identifier = req.query.id || null;
            if (!identifier) {
                return res.status(400).json({ error: "Missing command identifier" });
            }
            const index = this.latestCommand.findIndex(cmd => cmd.id === identifier);
            if (index === -1)
                return res.status(404).json({ error: "Command not found" });
            try {
                const removedCommand = this.latestCommand.splice(index, 1)[0];
                res.json({ ok: true, removedCommand });
            }
            catch (error) {
                console.error("Error removing command:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
        this.app.listen(this.port, () => console.log(`Server running on port ${this.port}`));
        let firebase = new Firebase_js_1.default({
            config: `${process.cwd()}/src/resources/Firebase_Config.json`,
            url: "https://discord-bot-86cb7-default-rtdb.europe-west1.firebasedatabase.app"
        });
        let database = firebase.Init();
        globalThis.database = database;
        return this.latestCommand;
    }
}
exports.default = Server;
