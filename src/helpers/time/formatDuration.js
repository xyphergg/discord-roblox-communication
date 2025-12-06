"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = formatDuration;
function formatDuration(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    let result = [];
    if (days > 0)
        result.push(`${days}d`);
    if (hours > 0)
        result.push(`${hours}h`);
    if (minutes > 0)
        result.push(`${minutes}m`);
    if (seconds > 0)
        result.push(`${seconds}s`);
    return result.join(' ') || '0s';
}
