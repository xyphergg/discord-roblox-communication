"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parseDuration;
function parseDuration(str) {
    const regex = /(\d+)\s*(d|h|m|s)/gi;
    let match;
    let totalMs = 0;
    while ((match = regex.exec(str)) !== null) {
        const value = parseInt(match[1], 10);
        const unit = match[2].toLowerCase();
        switch (unit) {
            case "d":
                totalMs += value * 24 * 60 * 60 * 1000;
                break;
            case "h":
                totalMs += value * 60 * 60 * 1000;
                break;
            case "m":
                totalMs += value * 60 * 1000;
                break;
            case "s":
                totalMs += value * 1000;
                break;
        }
    }
    if (totalMs === 0)
        throw new Error("Invalid duration format");
    return totalMs;
}
