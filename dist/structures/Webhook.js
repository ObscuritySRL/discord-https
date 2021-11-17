"use strict";
/**
 * @see {@link https://discord.com/developers/docs/resources/webhook#webhook-object}
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
const Payload_1 = __importDefault(require("./Payload"));
class Webhook {
    constructor(client, data) {
        this.applicationId = data.application_id;
        this.client = client;
        this.token = data.token;
        this.url = `https://discordapp.com/api/webhooks/${data.application_id}/${data.token}`;
    }
    /**
     * -------------------------------------------------------
     * * Methods
     * -------------------------------------------------------
     */
    async send(data) {
        const messagePayload = new Payload_1.default(data);
        await got_1.default.post(this.url, { body: messagePayload.body, ...Webhook.GOT_OPTIONS });
    }
}
exports.default = Webhook;
/**
 * -------------------------------------------------------
 * * Properties
 * -------------------------------------------------------
 */
Webhook.GOT_OPTIONS = {
    cache: new Map(),
    decompress: true,
    dnsCache: true,
    http2: true,
};
