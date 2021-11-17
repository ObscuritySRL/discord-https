/**
 * @see {@link https://discord.com/developers/docs/resources/channel#attachment-object}
 */
/// <reference types="node" />
interface AttachmentData {
    attachment?: Buffer;
    filename?: string;
}
export default class Attachment {
    constructor(data?: AttachmentData);
    /**
     * -------------------------------------------------------
     * * Properties
     * -------------------------------------------------------
     */
    attachment?: Buffer;
    filename?: string;
    /**
     * -------------------------------------------------------
     * * Methods
     * -------------------------------------------------------
     */
    setAttachment(attachment: Buffer): this;
    setFilename(filename: string): this;
}
export {};
