/**
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object}
 */
import Color from 'color';
export interface EmbedData {
    author?: {
        icon_url?: string;
        name: string;
        proxy_icon_url?: string;
        url?: string;
    };
    color?: number;
    description?: string;
    fields?: {
        inline?: boolean;
        name: string;
        value: string;
    }[];
    footer?: {
        icon_url?: string;
        proxy_icon_url?: string;
        text: string;
    };
    image?: {
        height?: number;
        proxy_url?: string;
        url: string;
        width?: number;
    };
    provider?: {
        name?: string;
        url?: string;
    };
    thumbnail?: {
        height?: number;
        proxy_url?: string;
        url: string;
        width?: number;
    };
    timestamp?: string;
    title?: string;
    url?: string;
    video?: {
        height?: number;
        proxy_url?: string;
        url: string;
        width?: number;
    };
}
export default class Embed {
    constructor(data?: EmbedData);
    /**
     * -------------------------------------------------------
     * * Properties
     * -------------------------------------------------------
     */
    author: {
        iconURL?: string;
        name: string;
        proxyIconURL?: string;
        url?: string;
    } | null;
    color: Color | null;
    description: string | null;
    footer: {
        iconURL?: string;
        proxyIconURL?: string;
        text: string;
    } | null;
    fields: {
        inline?: boolean;
        name: string;
        value: string;
    }[];
    image: {
        height?: number;
        proxyURL?: string;
        url: string;
        width?: number;
    } | null;
    provider: {
        name?: string;
        url?: string;
    } | null;
    thumbnail: {
        height?: number;
        proxyURL?: string;
        url: string;
        width?: number;
    } | null;
    timestamp: Date | null;
    title: string | null;
    url: string | null;
    video: {
        height?: number;
        proxyURL?: string;
        url: string;
        width?: number;
    } | null;
    /**
     * -------------------------------------------------------
     * * Methods
     * -------------------------------------------------------
     */
    addFields(data: {
        inline?: boolean;
        name: string;
        value: string;
    }[]): this;
    setAuthor(name: string, iconURL?: string, url?: string): this;
    setColor(color: any): this;
    setDescription(description: string): this;
    setFooter(text: string, iconURL?: string): this;
    setImage(url: string): this;
    setThumbnail(url: string): this;
    setTimestamp(timestamp: Date | number | string): this;
    setTitle(title: string): this;
    toJSON(): EmbedData;
}
