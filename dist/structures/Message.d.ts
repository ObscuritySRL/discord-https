import { UserData } from './User';
import Client from '../clients/Client';
/**
 * @see {@link https://canary.discord.com/developers/docs/resources/channel#attachment-object}
 */
interface AttachmentOptions {
    content_type?: string;
    description?: string;
    ephemeral?: boolean;
    height?: number | null;
    id: string;
    filename: string;
    proxy_url: string;
    size: number;
    url: string;
    width?: number | null;
}
/**
 * @see {@link https://canary.discord.com/developers/docs/resources/channel#channel-mention-object}
 */
interface ChannelMentionOptions {
    guild_id: string;
    id: string;
    name: string;
    type: number;
}
/**
 * @see {@link https://canary.discord.com/developers/docs/resources/channel#message-object}
 */
export interface MessageData {
    applicationId?: string;
    attachments: AttachmentOptions[];
    author: UserData;
    channelId: string;
    components: any[];
    content: string;
    edited_timestamp: string | null;
    embeds: any[];
    flags: number;
    guildId?: string;
    id: string;
    pinned: boolean;
    mention_channels?: ChannelMentionOptions[];
    mention_everyone: boolean;
    mention_roles: string[];
    mentions: UserData[];
    timestamp: string;
    tts: boolean;
    type: number;
}
export default class GuildMember {
    constructor(client: Client, data: MessageData, guildId?: string | null);
    readonly client: Client;
    readonly guildId: string | null;
}
export {};
