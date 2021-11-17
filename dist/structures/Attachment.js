"use strict";
/**
 * @see {@link https://discord.com/developers/docs/resources/channel#attachment-object}
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Attachment {
    constructor(data = {}) {
        this.attachment = data.attachment;
        this.filename = data.filename;
    }
    /**
     * -------------------------------------------------------
     * * Methods
     * -------------------------------------------------------
     */
    setAttachment(attachment) {
        this.attachment = attachment;
        return this;
    }
    setFilename(filename) {
        this.filename = filename;
        return this;
    }
}
exports.default = Attachment;
