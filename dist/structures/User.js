"use strict";
/**
 * @see {@link https://discord.com/developers/docs/resources/user#user-object}
 */
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(client, data) {
        this.avatar = data.avatar;
        this.avatarURL = `https://cdn.discordapp.com/${data.avatar
            ? `avatars/${data.id}/${data.avatar}`
            : `embed/avatars/${data.discriminator % 5}.png`}`;
        this.bot = data.bot ?? false;
        this.client = client;
        this.discriminator = data.discriminator;
        this.id = data.id;
        this.mention = `<@${this.id}>`;
        this.publicFlags = data.public_flags ?? null;
        this.tag = `${data.username}#${data.discriminator}`;
        this.username = data.username;
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
exports.default = User;
