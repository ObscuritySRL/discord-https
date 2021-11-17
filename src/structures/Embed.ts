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
  constructor(data: EmbedData = {}) {
    this.author = data.author !== undefined
      ? {
        iconURL: data.author?.icon_url,
        name: data.author.name,
        proxyIconURL: data.author?.proxy_icon_url,
        url: data.author?.url,
      }
      : null;

    this.color = data.color !== undefined ? new Color(data.color) : null;

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

  addFields(data: { inline?: boolean; name: string; value: string; }[]): this {
    this.fields = [...this.fields ?? [], ...data];

    return this;
  }

  setAuthor(name:string, iconURL?: string, url?: string) {
    this.author = { name, iconURL, url };

    return this;
  }

  setColor(color: any): this {
    this.color = new Color(color);

    return this;
  }

  setDescription(description: string): this {
    this.description = description;

    return this;
  }

  setFooter(text: string, iconURL?: string): this {
    this.footer = { iconURL, text };

    return this;
  }

  setImage(url: string): this {
    this.image = { url };

    return this;
  }

  setThumbnail(url: string): this {
    this.thumbnail = { url };

    return this;
  }

  setTimestamp(timestamp: Date | number | string): this {
    this.timestamp = new Date(timestamp);

    return this;
  }

  setTitle(title:string): this {
    this.title = title;

    return this;
  }

  toJSON(): EmbedData {
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
