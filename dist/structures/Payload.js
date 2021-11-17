"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const form_data_1 = __importDefault(require("form-data"));
class Payload {
    constructor(data) {
        this.body = new form_data_1.default();
        this.body.append('payload_json', JSON.stringify({
            components: data.components?.map((component) => component.toJSON()) ?? [],
            content: data.content ?? '',
            embeds: data.embeds?.map((embed) => embed.toJSON()) ?? [],
            flags: data.ephemeral ? 64 /* EPHEMERAL */ : 0 /* NONE */,
        }));
        data.attachments?.forEach((attachment) => this.body.append(attachment.filename, attachment.attachment, attachment.filename));
        this.headers = this.body.getHeaders();
    }
}
exports.default = Payload;
