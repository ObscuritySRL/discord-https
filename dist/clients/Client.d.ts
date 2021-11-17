/// <reference types="node" />
import Events from 'events';
import AuthManager from '../managers/AuthManager';
import FastifyManager from '../managers/FastifyManager';
interface ClientOptions {
    clientId: string;
    clientSecret: string;
    port: number;
    publicKey: string;
}
export default class Client extends Events {
    constructor(clientOptions: ClientOptions);
    readonly authManager: AuthManager;
    readonly clientId: string;
    readonly fastifyManager: FastifyManager;
    start(): Promise<void>;
}
export {};
