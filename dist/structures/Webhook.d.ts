/**
 * @see {@link https://discord.com/developers/docs/resources/webhook#webhook-object}
 */
import Client from '../clients/Client';
import { PayloadData } from './Payload';
export interface WebhookData {
    application_id: string;
    token: string;
}
export default class Webhook {
    constructor(client: Client, data: WebhookData);
    /**
     * -------------------------------------------------------
     * * Properties
     * -------------------------------------------------------
     */
    static GOT_OPTIONS: {
        cache: Map<any, any>;
        decompress: boolean;
        dnsCache: boolean;
        http2: boolean;
    };
    applicationId: string;
    client: Client;
    token: string;
    url: string;
    /**
     * -------------------------------------------------------
     * * Methods
     * -------------------------------------------------------
     */
    send(data: PayloadData): Promise<void>;
}
