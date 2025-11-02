"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GenerateIdentifier;
const Keys = new Array;
function GenerateIdentifier() {
    const randomId = function (length = 12) {
        return Math.random().toString(36).substring(2, length + 2);
    };
    let newId = randomId();
    Keys.find(function (id) {
        return id === newId;
    });
    return newId;
}
