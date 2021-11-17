/**
 * @see {@link https://discord.com/developers/docs/resources/webhook#webhook-object}
 */

import Got from 'got';

import Client from '../clients/Client';
import Payload, { PayloadData } from './Payload';

export interface WebhookData {
  application_id: string;
  token: string;
}

export default class Webhook {
  constructor(client: Client, data: WebhookData) {
    this.applicationId = data.application_id;

    this.client = client;

    this.token = data.token;

    this.url = `https://discordapp.com/api/webhooks/${data.application_id}/${data.token}`;
  }

  /**
   * -------------------------------------------------------
   * * Properties
   * -------------------------------------------------------
   */

  static GOT_OPTIONS = {
    cache: new Map(),
    decompress: true,
    dnsCache: true,
    http2: true,
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

  async send(data: PayloadData) {
    const messagePayload = new Payload(data);

    await Got.post(this.url, { body: messagePayload.body, ...Webhook.GOT_OPTIONS });
  }
}
