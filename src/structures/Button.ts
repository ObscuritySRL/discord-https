import { ButtonStyle, ComponentType } from '../util/Constants';

export interface ButtonData {
  custom_id?: string;
  customId?: string;
  disabled?: boolean;
  emoji?: string;
  label?: string;
  style?: ButtonStyle;
  type?: ComponentType;
  url?: string;
}

export default class Button {
  constructor(data: ButtonData = {}) {
    this.customId = data.custom_id ?? data.customId;

    this.disabled = data.disabled;

    this.emoji = data.emoji;

    this.label = data.label;

    this.style = data.style;

    this.url = data.url;
  }

  /**
   * -------------------------------------------------------
   * * Properties
   * -------------------------------------------------------
   */

  customId?: string;

  disabled?: boolean;

  emoji?: string;

  label?: string;

  style?: ButtonStyle;

  readonly type = ComponentType.BUTTON;

  url?: string;

  /**
   * -------------------------------------------------------
   * * Methods
   * -------------------------------------------------------
   */

  setCustomId(customId: string): this {
    this.customId = customId;

    return this;
  }

  setDisabled(disabled = true): this {
    this.disabled = disabled;

    return this;
  }

  setEmoji(emoji: string): this {
    this.emoji = emoji;

    return this;
  }

  setLabel(label: string): this {
    this.label = label;

    return this;
  }

  setStyle(style: ButtonStyle): this {
    this.style = style;

    return this;
  }

  setURL(url: string): this {
    this.url = url;

    return this;
  }

  toJSON(): ButtonData {
    return {
      custom_id: this.customId,
      disabled: this.disabled,
      emoji: this.emoji,
      label: this.label,
      style: this.style,
      type: this.type,
      url: this.url,
    };
  }
}
