"use strict";
/* eslint-disable no-shadow, no-unused-vars */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify_raw_body_1 = __importDefault(require("fastify-raw-body"));
const tweetnacl_1 = __importDefault(require("tweetnacl"));
const Command_1 = __importDefault(require("../structures/Command"));
const ContextMenu_1 = __importDefault(require("../structures/ContextMenu"));
class FastifyManager {
    constructor(client, fastifyManagerOptions) {
        this.fastify = (0, fastify_1.default)({ ignoreTrailingSlash: true });
        this.client = client;
        this.fastify.register(fastify_raw_body_1.default);
        this.fastify
            .addHook('preHandler', this.verifyRequest.bind(this))
            .addHook('preHandler', this.replyToPing.bind(this));
        this.fastify.post('*', this.handleRequest.bind(this));
        this.port = fastifyManagerOptions.port;
        this.publicKey = Buffer.from(fastifyManagerOptions.publicKey, 'hex');
    }
    /**
     * -------------------------------------------------------
     * * Getters/setters
     * -------------------------------------------------------
     */
    // …
    /**
     * -------------------------------------------------------
     * * Fastify events
     * -------------------------------------------------------
     */
    // eslint-disable-next-line class-methods-use-this, max-len
    handleRequest(request, reply) {
        switch (request.body.type) {
            case 2 /* APPLICATION_COMMAND */:
                switch (request.body.data.type) {
                    case 1 /* CHAT_INPUT */:
                        this.client.emit('commandInteraction', new Command_1.default(this.client, request.body, reply));
                        break;
                    case 3 /* MESSAGE */:
                    case 2 /* USER */:
                        this.client.emit('contextMenuInteraction', new ContextMenu_1.default(this.client, request.body, reply));
                        break;
                    default:
                }
                break;
            // case InteractionType.MESSAGE_COMPONENT:
            //   // switch (request.body.data.component_type) {
            //     // case MessageComponentTypes.BUTTON:
            //     // eslint-disable-next-line max-len
            // eslint-disable-next-line max-len
            //     //   this.client.emit('buttonInteraction', new ButtonInteraction(this.client, request.body, reply));
            //     //   break;
            //     // case MessageComponentTypes.SELECT_MENU:
            //     //   // TODO: Create SelectMenuInteraction structure
            //     //   break;
            //     default:
            //   }
            // break;
            default:
        }
        // reply.send(request.body);
    }
    // eslint-disable-next-line class-methods-use-this, max-len
    replyToPing(request, reply, done) {
        if (request.body.type === 1 /* PING */) {
            return reply.code(200).send({ type: 1 /* PONG */ });
        }
        return done();
    }
    // eslint-disable-next-line max-len
    verifyRequest(request, reply, done) {
        const message = Buffer.from(`${request.headers['x-signature-timestamp']}${request.rawBody}`);
        const signature = Buffer.from(`${request.headers['x-signature-ed25519']}`, 'hex');
        const verified = tweetnacl_1.default.sign.detached.verify(message, signature, this.publicKey);
        if (!verified) {
            return reply.code(401).send();
        }
        return done();
    }
    /**
     * -------------------------------------------------------
     * * Methods
     * -------------------------------------------------------
     */
    async start() {
        await this.fastify.listen({ backlog: 511, host: '::', port: this.port });
        this.client.emit('fastifyManagerReady');
    }
}
exports.default = FastifyManager;
