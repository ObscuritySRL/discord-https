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
    constructor(data?: ButtonData);
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
    setCustomId(customId: string): this;
    setDisabled(disabled?: boolean): this;
    setEmoji(emoji: string): this;
    setLabel(label: string): this;
    setStyle(style: ButtonStyle): this;
    setURL(url: string): this;
    toJSON(): ButtonData;
}
