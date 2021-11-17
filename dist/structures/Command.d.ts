import { FastifyReply } from 'fastify';
import { ApplicationCommandOptionType, ApplicationCommandType, InteractionType } from '../util/Constants';
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
    constructor(client: Client, data: CommandData, reply: FastifyReply);
    /**
     * -------------------------------------------------------
     * * Properties
     * -------------------------------------------------------
     */
    readonly applicationId: string;
    readonly channelId: string;
    readonly client: Client;
    deferred: boolean;
    ephemeral: boolean;
    readonly guildId: string | null;
    readonly id: string;
    readonly isSubCommand: boolean;
    readonly isSubCommandGroup: boolean;
    readonly member: GuildMember | null;
    readonly name: string;
    readonly options: CommandOptionResolver;
    private readonly reply;
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
    get replied(): boolean;
    /**
     * -------------------------------------------------------
     * * Methods
     * -------------------------------------------------------
     */
    defer(ephemeral?: boolean): void;
    followup(payload: PayloadData): Promise<void>;
}
