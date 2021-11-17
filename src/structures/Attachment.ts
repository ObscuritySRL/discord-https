/**
 * @see {@link https://discord.com/developers/docs/resources/channel#attachment-object}
 */

interface AttachmentData {
  attachment?: Buffer;
  filename?: string;
}

export default class Attachment {
  constructor(data: AttachmentData = {}) {
    this.attachment = data.attachment;

    this.filename = data.filename;
  }

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

  setAttachment(attachment: Buffer): this {
    this.attachment = attachment;

    return this;
  }

  setFilename(filename: string): this {
    this.filename = filename;

    return this;
  }
}
