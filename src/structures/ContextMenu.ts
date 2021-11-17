import { FastifyReply } from 'fastify';

import {
  ApplicationCommandType, InteractionResponseType, InteractionType, MessageFlag,
} from '../util/Constants';
import { PayloadData } from './Payload';

import Client from '../clients/Client';
import ContextMenuTargetResolver from './ContextMenuTargetResolver';
import GuildMember, { GuildMemberData } from './GuildMember';
import User, { UserData } from './User';
import Webhook from './Webhook';

// TODO: Add support for channel and role
export interface ContextMenuData {
  application_id: string;
  channel_id: string;
  data: {
    id: string;
    name: string;
    resolved: {
      members?: { [key: string]: GuildMemberData; };
      users?: { [key: string]: UserData; };
    };
    target_id: string;
    type: ApplicationCommandType;
  };
  member?: GuildMemberData;
  guild_id?: string;
  id: string;
  token: string;
  type: InteractionType;
  user: UserData;
  version: number;
}

export default class ContextMenu {
  constructor(client: Client, data: ContextMenuData, reply: FastifyReply) {
    Object.values(data.data.resolved?.members ?? {}).forEach(
      // eslint-disable-next-line no-param-reassign
      (member) => { member.guild_id = data.guild_id as string; },
    );

    this.applicationId = data.application_id;

    this.channelId = data.channel_id;

    this.client = client;

    this.contextMenuId = data.data.id;

    this.contextMenuName = data.data.name;

    this.guildId = data.guild_id ?? null;

    this.id = data.id;

    this.member = data.member
      ? new GuildMember(client, data.member as GuildMemberData, data.guild_id)
      : null;

    this.name = data.data.name;

    this.reply = reply;

    this.target = new ContextMenuTargetResolver(client, data.data.target_id, data.data.resolved);

    this.token = data.token;

    this.type = data.data.type;

    this.user = new User(client, data.member?.user ?? data.user);

    this.version = data.version;

    this.webhook = new Webhook(client, { application_id: data.application_id, token: data.token });
  }

  /**
   * -------------------------------------------------------
   * * Properties
   * -------------------------------------------------------
   */

  readonly applicationId: string;

  readonly channelId: string;

  readonly client: Client;

  readonly contextMenuId: string;

  readonly contextMenuName: string;

  deferred = false;

  ephemeral = false;

  readonly guildId: string | null;

  readonly id: string;

  readonly member: GuildMember | null;

  readonly name: string;

  // replied = false;

  private readonly reply: FastifyReply;

  readonly target: ContextMenuTargetResolver;

  readonly token: string;

  readonly type: ApplicationCommandType;

  readonly user: User;

  readonly version: number;

  readonly webhook: Webhook;

  /**
   * -------------------------------------------------------
   * * Getters/setters
   * -------------------------------------------------------
   */

  get replied(): boolean {
    return this.reply.sent;
  }

  /**
   * -------------------------------------------------------
   * * Methods
   * -------------------------------------------------------
   */

  defer(ephemeral = false): void {
    this.reply.code(200).send({
      data: { flags: ephemeral ? MessageFlag.EPHEMERAL : MessageFlag.NONE },
      type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE,
    });

    this.deferred = true;

    this.ephemeral = ephemeral;
  }

  async followup(payload: PayloadData) {
    return this.webhook.send(payload);
  }
}
