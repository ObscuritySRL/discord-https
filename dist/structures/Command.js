"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommandOptionResolver_1 = __importDefault(require("./CommandOptionResolver"));
const GuildMember_1 = __importDefault(require("./GuildMember"));
const User_1 = __importDefault(require("./User"));
const Webhook_1 = __importDefault(require("./Webhook"));
class Command {
    constructor(client, data, reply) {
        // readonly commandId: string;
        // readonly commandName: string;
        this.deferred = false;
        this.ephemeral = false;
        Object.values(data.data.resolved?.members ?? {}).forEach(
        // eslint-disable-next-line no-param-reassign
        (member) => { member.guild_id = data.guild_id; });
        this.applicationId = data.application_id;
        this.channelId = data.channel_id;
        this.client = client;
        this.guildId = data.guild_id ?? null;
        this.id = data.id;
        this.isSubCommand = data.data.options?.[0].type === 1 /* SUB_COMMAND */;
        // eslint-disable-next-line max-len
        this.isSubCommandGroup = data.data.options?.[0].type === 2 /* SUB_COMMAND_GROUP */;
        this.member = data.member
            ? new GuildMember_1.default(client, data.member, data.guild_id)
            : null;
        this.name = data.data.name;
        this.options = new CommandOptionResolver_1.default(client, data.data.options?.[0].options ?? data.data.options, data.data?.resolved);
        this.reply = reply;
        this.subCommandName = data.data.options?.[0].type === 1 /* SUB_COMMAND */
            ? data.data.options?.[0].name
            : null;
        // eslint-disable-next-line max-len
        this.subCommandGroupName = data.data.options?.[0].type === 2 /* SUB_COMMAND_GROUP */
            ? data.data.options?.[0].name
            : null;
        this.token = data.token;
        this.type = data.type;
        this.user = new User_1.default(client, data.member?.user ?? data.user);
        this.version = data.version;
        this.webhook = new Webhook_1.default(client, { application_id: data.application_id, token: data.token });
    }
    /**
     * -------------------------------------------------------
     * * Getters/setters
     * -------------------------------------------------------
     */
    get replied() {
        return this.reply.sent;
    }
    /**
     * -------------------------------------------------------
     * * Methods
     * -------------------------------------------------------
     */
    defer(ephemeral = false) {
        this.reply.code(200).send({
            data: { flags: ephemeral ? 64 /* EPHEMERAL */ : 0 /* NONE */ },
            type: 5 /* DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE */,
        });
        this.deferred = true;
        this.ephemeral = ephemeral;
    }
    async followup(payload) {
        return this.webhook.send(payload);
    }
}
exports.default = Command;
