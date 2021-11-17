"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const got_1 = __importDefault(require("got"));
class AuthManager {
    constructor(client, authManagerOptions) {
        this.oAuthToken = {
            access_token: '', expires_in: 0, scope: '', token_type: '',
        };
        this.client = client;
        this.clientId = authManagerOptions.clientId;
        this.clientSecret = authManagerOptions.clientSecret;
    }
    /**
     * -------------------------------------------------------
     * * Getters/setters
     * -------------------------------------------------------
     */
    get accessToken() {
        return this.oAuthToken.access_token;
    }
    get authorization() {
        return `${this.oAuthToken.token_type} ${this.oAuthToken.access_token}`;
    }
    /**
     * -------------------------------------------------------
     * * Methods
     * -------------------------------------------------------
     */
    async login() {
        this.oAuthToken = await got_1.default.post(AuthManager.OAUTH_URL, {
            form: {
                client_id: this.clientId,
                client_secret: this.clientSecret,
                grant_type: AuthManager.OAUTH_GRANT_TYPE,
                scope: AuthManager.OAUTH_SCOPE,
            },
        }).json();
        setTimeout(this.login.bind(this), this.oAuthToken.expires_in * 1000);
    }
    async start() {
        await this.login();
        this.client.emit('authManagerReady');
    }
}
exports.default = AuthManager;
/**
 * -------------------------------------------------------
 * * Properties
 * -------------------------------------------------------
 */
AuthManager.OAUTH_GRANT_TYPE = 'client_credentials';
AuthManager.OAUTH_SCOPE = 'applications.commands.update';
AuthManager.OAUTH_URL = 'https://discord.com/api/oauth2/token';
