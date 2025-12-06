"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreateCommand;
const GenerateIdentifier_1 = __importDefault(require("./GenerateIdentifier"));
function CreateCommand(Type, data) {
    const command = { command: Type, id: '', ...data };
    const id = (0, GenerateIdentifier_1.default)();
    command.id = id;
    globalThis.latestCommand.push(command);
    return command;
}
