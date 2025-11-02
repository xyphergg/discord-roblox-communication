"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const CustomClient_js_1 = __importDefault(require("./classes/CustomClient.js"));
const Server_js_1 = __importDefault(require("./classes/Server.js"));
(0, dotenv_1.config)();
let Client = new CustomClient_js_1.default;
let App = new Server_js_1.default;
console.log("yo i started");
App.Init();
Client.Init();
