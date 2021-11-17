"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __importDefault(require("events"));
const AuthManager_1 = __importDefault(require("../managers/AuthManager"));
const FastifyManager_1 = __importDefault(require("../managers/FastifyManager"));
class Client extends events_1.default {
    constructor(clientOptions) {
        super();
        this.authManager = new AuthManager_1.default(this, {
            clientId: clientOptions.clientId,
            clientSecret: clientOptions.clientSecret,
        });
        this.clientId = clientOptions.clientId;
        this.fastifyManager = new FastifyManager_1.default(this, {
            port: clientOptions.port,
            publicKey: clientOptions.publicKey,
        });
    }
    async start() {
        await Promise.all([
            this.authManager.start(),
            this.fastifyManager.start(),
        ]);
        this.emit('clientReady');
    }
}
exports.default = Client;
