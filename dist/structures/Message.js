"use strict";
/* eslint-disable camelcase, no-nested-ternary */
Object.defineProperty(exports, "__esModule", { value: true });
class GuildMember {
    constructor(client, data, guildId = null) {
        this.client = client;
        this.guildId = data.guildId ?? guildId ?? null;
    }
}
exports.default = GuildMember;
