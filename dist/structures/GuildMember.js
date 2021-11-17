"use strict";
/**
 * @see {@link https://discord.com/developers/docs/resources/guild#guild-member-object}
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./User"));
class GuildMember {
    constructor(client, data, guildId) {
        this.avatar = data.avatar ?? null;
        this.avatarURL = `https://cdn.discordapp.com/${
        // eslint-disable-next-line no-nested-ternary
        data.avatar && (data.guild_id || guildId)
            ? `guilds/${data.guild_id ?? guildId}/users/${data.user.id}/avatars/${data.avatar}`
            : data.user.avatar
                ? `avatars/${data.user.id}/${data.user.avatar}`
                : `embed/avatars/${data.user.discriminator % 5}.png`}`;
        this.client = client;
        this.deaf = data.deaf ?? false;
        this.displayName = data.nick ?? data.user.username;
        this.guildId = data.guild_id ?? guildId ?? null;
        this.id = data.user.id;
        this.isPending = data.is_pending ?? false;
        this.joinedAt = new Date(data.joined_at);
        this.mention = `<@${data.nick ? '!' : ''}${data.user.id}>`;
        this.mute = data.mute ?? false;
        this.nickname = data.nick ?? null;
        this.pending = data.pending ?? null;
        this.permissions = data.permissions ?? null;
        this.premiumSince = data.premium_since
            ? new Date(data.premium_since)
            : null;
        this.roles = data.roles;
        this.user = new User_1.default(client, data.user);
    }
    /**
     * -------------------------------------------------------
     * * Methods
     * -------------------------------------------------------
     */
    toString() {
        return this.mention;
    }
}
exports.default = GuildMember;
