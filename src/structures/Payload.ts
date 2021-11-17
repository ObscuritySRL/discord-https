import FormData from 'form-data';

import { MessageFlag } from '../util/Constants';
import ActionRow from './ActionRow';
import Attachment from './Attachment';
import Embed from './Embed';

export interface PayloadData {
  attachments?: Attachment[];
  components?: ActionRow[];
  content?: string;
  embeds?: Embed[];
  ephemeral?: boolean;
}

export default class Payload {
  constructor(data: PayloadData) {
    this.body = new FormData();

    this.body.append(
      'payload_json',
      JSON.stringify({
        components: data.components?.map((component) => component.toJSON()) ?? [],
        content: data.content ?? '',
        embeds: data.embeds?.map((embed) => embed.toJSON()) ?? [],
        flags: data.ephemeral ? MessageFlag.EPHEMERAL : MessageFlag.NONE,
      }),
    );

    data.attachments?.forEach(
      (attachment) => this.body.append(
        attachment.filename as string,
        attachment.attachment,
        attachment.filename,
      ),
    );

    this.headers = this.body.getHeaders();
  }

  /**
   * -------------------------------------------------------
   * * Properties
   * -------------------------------------------------------
   */

  readonly body: FormData;

  readonly headers: FormData.Headers;

  /**
   * -------------------------------------------------------
   * * Getters/setters
   * -------------------------------------------------------
   */
}
