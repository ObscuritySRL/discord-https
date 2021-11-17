"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Button {
    constructor(data = {}) {
        this.type = 2 /* BUTTON */;
        this.customId = data.custom_id ?? data.customId;
        this.disabled = data.disabled;
        this.emoji = data.emoji;
        this.label = data.label;
        this.style = data.style;
        this.url = data.url;
    }
    /**
     * -------------------------------------------------------
     * * Methods
     * -------------------------------------------------------
     */
    setCustomId(customId) {
        this.customId = customId;
        return this;
    }
    setDisabled(disabled = true) {
        this.disabled = disabled;
        return this;
    }
    setEmoji(emoji) {
        this.emoji = emoji;
        return this;
    }
    setLabel(label) {
        this.label = label;
        return this;
    }
    setStyle(style) {
        this.style = style;
        return this;
    }
    setURL(url) {
        this.url = url;
        return this;
    }
    toJSON() {
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
exports.default = Button;
