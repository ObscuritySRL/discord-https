import { FastifyReply } from 'fastify';

import {
  // eslint-disable-next-line max-len
  ApplicationCommandOptionType, ApplicationCommandType, InteractionResponseType, InteractionType, MessageFlag,
} from '../util/Constants';
import { PayloadData } from './Payload';

import Client from '../clients/Client';
import CommandOptionResolver from './CommandOptionResolver';
import GuildMember, { GuildMemberData } from './GuildMember';
import User, { UserData } from './User';
import Webhook from './Webhook';

export interface CommandData {
  application_id: string;
  channel_id: string;
  data: {
    id: string;
    name: string;
    options?: {
      options?: {
        name: string;
        type: ApplicationCommandOptionType;
        value: string | number | boolean;
      }[];
      name: string;
      type: ApplicationCommandOptionType;
      value?: string | number | boolean;
    }[];
    resolved?: {
      members?: {
        [key: string]: GuildMemberData;
      };
      users?: {
        [key: string]: UserData;
      };
    };
    // + ContextMenuInteraction will have target_id
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

export default class Command {
  constructor(client: Client, data: CommandData, reply: FastifyReply) {
    Object.values(data.data.resolved?.members ?? {}).forEach(
      // eslint-disable-next-line no-param-reassign
      (member) => { member.guild_id = data.guild_id as string; },
    );

    this.applicationId = data.application_id;

    this.channelId = data.channel_id;

    this.client = client;

    this.guildId = data.guild_id ?? null;

    this.id = data.id;

    this.isSubCommand = data.data.options?.[0].type === ApplicationCommandOptionType.SUB_COMMAND;

    // eslint-disable-next-line max-len
    this.isSubCommandGroup = data.data.options?.[0].type === ApplicationCommandOptionType.SUB_COMMAND_GROUP;

    this.member = data.member
      ? new GuildMember(client, data.member as GuildMemberData, data.guild_id)
      : null;

    this.name = data.data.name;

    this.options = new CommandOptionResolver(
      client,
      data.data.options?.[0].options ?? data.data.options,
      data.data?.resolved,
    );

    this.reply = reply;

    this.subCommandName = data.data.options?.[0].type === ApplicationCommandOptionType.SUB_COMMAND
      ? data.data.options?.[0].name
      : null;

    // eslint-disable-next-line max-len
    this.subCommandGroupName = data.data.options?.[0].type === ApplicationCommandOptionType.SUB_COMMAND_GROUP
      ? data.data.options?.[0].name
      : null;

    this.token = data.token;

    this.type = data.type;

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

  // readonly commandId: string;

  // readonly commandName: string;

  deferred = false;

  ephemeral = false;

  readonly guildId: string | null;

  readonly id: string;

  readonly isSubCommand: boolean;

  readonly isSubCommandGroup: boolean;

  readonly member: GuildMember | null;

  readonly name: string;

  readonly options: CommandOptionResolver;

  // replied = false;

  private readonly reply: FastifyReply;

  readonly subCommandName: string | null;

  readonly subCommandGroupName: string | null;

  readonly token: string;

  readonly type: InteractionType;

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
