import { FastifyReply } from 'fastify';
import { ApplicationCommandType, InteractionType } from '../util/Constants';
import { PayloadData } from './Payload';
import Client from '../clients/Client';
import ContextMenuTargetResolver from './ContextMenuTargetResolver';
import GuildMember, { GuildMemberData } from './GuildMember';
import User, { UserData } from './User';
import Webhook from './Webhook';
export interface ContextMenuData {
    application_id: string;
    channel_id: string;
    data: {
        id: string;
        name: string;
        resolved: {
            members?: {
                [key: string]: GuildMemberData;
            };
            users?: {
                [key: string]: UserData;
            };
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
    constructor(client: Client, data: ContextMenuData, reply: FastifyReply);
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
    deferred: boolean;
    ephemeral: boolean;
    readonly guildId: string | null;
    readonly id: string;
    readonly member: GuildMember | null;
    readonly name: string;
    private readonly reply;
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
    get replied(): boolean;
    /**
     * -------------------------------------------------------
     * * Methods
     * -------------------------------------------------------
     */
    defer(ephemeral?: boolean): void;
    followup(payload: PayloadData): Promise<void>;
}
