"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    client;
    name;
    category;
    description;
    options;
    dm_permission;
    default_member_permissions;
    constructor(client, options) {
        this.client = client;
        this.name = options.name;
        this.description = options.description;
        this.category = options.category;
        this.options = options.options;
        this.dm_permission = options.dm_permission;
        this.default_member_permissions = options.default_member_permissions;
    }
    Execute(interaction) {
    }
}
exports.default = Command;
