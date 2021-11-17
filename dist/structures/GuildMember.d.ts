/**
 * @see {@link https://discord.com/developers/docs/resources/guild#guild-member-object}
 */
import Client from '../clients/Client';
import User, { UserData } from './User';
export interface GuildMemberData {
    avatar: string;
    communication_disabled_until: string | null;
    deaf: boolean;
    guild_id: string;
    is_pending?: boolean;
    joined_at: string;
    mute?: boolean;
    nick: string;
    pending?: boolean;
    permissions: number;
    premium_since: string;
    roles: string[];
    user: UserData;
}
export default class GuildMember {
    constructor(client: Client, data: GuildMemberData, guildId?: string);
    /**
     * -------------------------------------------------------
     * * Properties
     * -------------------------------------------------------
     */
    readonly avatar: string | null;
    readonly avatarURL: string;
    readonly client: Client;
    readonly deaf: boolean;
    readonly displayName: string;
    readonly guildId: string | null;
    readonly id: string;
    readonly isPending: boolean;
    readonly joinedAt: Date;
    readonly mention: string;
    readonly mute: boolean;
    readonly nickname: string | null;
    readonly pending: boolean | null;
    readonly permissions: number | null;
    readonly premiumSince: Date | null;
    readonly roles: string[];
    readonly user: User;
    /**
     * -------------------------------------------------------
     * * Methods
     * -------------------------------------------------------
     */
    toString(): string;
}
