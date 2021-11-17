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
  constructor(client: Client, data:GuildMemberData, guildId?: string) {
    this.avatar = data.avatar ?? null;

    this.avatarURL = `https://cdn.discordapp.com/${
      // eslint-disable-next-line no-nested-ternary
      data.avatar && (data.guild_id || guildId)
        ? `guilds/${data.guild_id ?? guildId}/users/${data.user.id}/avatars/${data.avatar}`
        : data.user.avatar
          ? `avatars/${data.user.id}/${data.user.avatar}`
          : `embed/avatars/${data.user.discriminator % 5}.png`
    }`;

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

    this.user = new User(client, data.user);
  }

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

  toString():string {
    return this.mention;
  }
}
