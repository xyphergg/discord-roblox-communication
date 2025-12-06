"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// var firebase = require("firebase-admin");
// var serviceAccount = process.env.FIREBASE_SECRET
// firebase.initializeApp({
//   credential: firebase.credential.cert(serviceAccount),
//   databaseURL: "https://discord-bot-86cb7-default-rtdb.europe-west1.firebasedatabase.app"
// });
class BotFirebase {
    config;
    url;
    database;
    constructor(options) {
        this.config = options.config;
        this.url = options.url;
    }
    Init() {
        let Database = firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.cert(this.config),
            databaseURL: this.url,
            databaseAuthVariableOverride: {
                uid: "265de2f8-494d-4e55-b673-4df192bd4f9f"
            }
        });
        this.database = Database;
        return Database;
    }
}
exports.default = BotFirebase;
