import FormData from 'form-data';
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
    constructor(data: PayloadData);
    /**
     * -------------------------------------------------------
     * * Properties
     * -------------------------------------------------------
     */
    readonly body: FormData;
    readonly headers: FormData.Headers;
}
