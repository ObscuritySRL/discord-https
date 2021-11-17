"use strict";
/**
 * @see {@link https://discord.com/developers/docs/resources/channel#embed-object}
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = __importDefault(require("color"));
class Embed {
    constructor(data = {}) {
        this.author = data.author !== undefined
            ? {
                iconURL: data.author?.icon_url,
                name: data.author.name,
                proxyIconURL: data.author?.proxy_icon_url,
                url: data.author?.url,
            }
            : null;
        this.color = data.color !== undefined ? new color_1.default(data.color) : null;
        this.description = data.description ?? null;
        this.footer = data.footer !== undefined
            ? {
                iconURL: data.footer?.icon_url,
                proxyIconURL: data.footer?.proxy_icon_url,
                text: data.footer.text,
            }
            : null;
        this.fields = data.fields ?? [];
        this.image = data.image !== undefined
            ? {
                height: data.image?.height,
                proxyURL: data.image?.proxy_url,
                url: data.image.url,
                width: data.image?.width,
            }
            : null;
        this.provider = data.provider !== undefined
            ? {
                name: data.provider?.name,
                url: data.provider?.url,
            }
            : null;
        this.thumbnail = data.thumbnail !== undefined
            ? {
                height: data.thumbnail?.height,
                proxyURL: data.thumbnail?.proxy_url,
                url: data.thumbnail.url,
                width: data.thumbnail?.width,
            }
            : null;
        this.timestamp = data.timestamp !== undefined ? new Date(data.timestamp) : null;
        this.title = data.title ?? null;
        this.url = data.url ?? null;
        this.video = data.video !== undefined
            ? {
                height: data.video?.height,
                proxyURL: data.video?.proxy_url,
                url: data.video.url,
                width: data.video?.width,
            }
            : null;
    }
    /**
     * -------------------------------------------------------
     * * Methods
     * -------------------------------------------------------
     */
    addFields(data) {
        this.fields = [...this.fields ?? [], ...data];
        return this;
    }
    setAuthor(name, iconURL, url) {
        this.author = { name, iconURL, url };
        return this;
    }
    setColor(color) {
        this.color = new color_1.default(color);
        return this;
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
    setFooter(text, iconURL) {
        this.footer = { iconURL, text };
        return this;
    }
    setImage(url) {
        this.image = { url };
        return this;
    }
    setThumbnail(url) {
        this.thumbnail = { url };
        return this;
    }
    setTimestamp(timestamp) {
        this.timestamp = new Date(timestamp);
        return this;
    }
    setTitle(title) {
        this.title = title;
        return this;
    }
    toJSON() {
        return {
            author: this.author ?? undefined,
            color: this.color?.rgbNumber() ?? undefined,
            description: this.description ?? undefined,
            fields: this.fields,
            footer: this.footer ?? undefined,
            image: this.image ?? undefined,
            thumbnail: this.thumbnail ?? undefined,
            title: this.title ?? undefined,
            timestamp: this.timestamp?.toString() ?? undefined,
            url: this.url ?? undefined,
        };
    }
}
exports.default = Embed;
