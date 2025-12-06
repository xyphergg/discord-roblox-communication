"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GuildInfo;
async function GuildInfo(type, guildId, field, Value) {
    let database = globalThis.database.database();
    database.goOnline();
    const ref = database.ref(`/${guildId}` + (field ? `/${field}` : ''));
    if (type === 'get') {
        const snapshot = await ref.once('value');
        return snapshot.val();
    }
    else if (type === 'set') {
        let status = await ref.set(Value, function () {
            return true;
        });
        return false;
    }
    else if (type === 'delete') {
        let status = await ref.remove(function () {
            return true;
        });
        return false;
    }
}
``;
