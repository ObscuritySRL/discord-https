/// <reference types="node" />
/// <reference types="node/http" />
/// <reference types="got/dist/source/core/utils/timed-out" />
import Client from '../clients/Client';
interface FastifyManagerOptions {
    port: number;
    publicKey: string;
}
export default class FastifyManager {
    constructor(client: Client, fastifyManagerOptions: FastifyManagerOptions);
    /**
     * -------------------------------------------------------
     * * Properties
     * -------------------------------------------------------
     */
    readonly client: Client;
    readonly port: number;
    private readonly publicKey;
    readonly fastify: import("fastify").FastifyInstance<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify").FastifyLoggerInstance> & PromiseLike<import("fastify").FastifyInstance<import("http").Server, import("http").IncomingMessage, import("http").ServerResponse, import("fastify").FastifyLoggerInstance>>;
    /**
     * -------------------------------------------------------
     * * Getters/setters
     * -------------------------------------------------------
     */
    /**
     * -------------------------------------------------------
     * * Fastify events
     * -------------------------------------------------------
     */
    private handleRequest;
    private replyToPing;
    private verifyRequest;
    /**
     * -------------------------------------------------------
     * * Methods
     * -------------------------------------------------------
     */
    start(): Promise<void>;
}
export {};
