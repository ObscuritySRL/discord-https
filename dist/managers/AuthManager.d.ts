import Client from '../clients/Client';
interface AuthManagerOptions {
    clientId: string;
    clientSecret: string;
}
export default class AuthManager {
    constructor(client: Client, authManagerOptions: AuthManagerOptions);
    /**
     * -------------------------------------------------------
     * * Properties
     * -------------------------------------------------------
     */
    static OAUTH_GRANT_TYPE: string;
    static OAUTH_SCOPE: string;
    static OAUTH_URL: string;
    readonly client: Client;
    readonly clientId: string;
    private readonly clientSecret;
    private oAuthToken;
    /**
     * -------------------------------------------------------
     * * Getters/setters
     * -------------------------------------------------------
     */
    get accessToken(): string;
    get authorization(): string;
    /**
     * -------------------------------------------------------
     * * Methods
     * -------------------------------------------------------
     */
    login(): Promise<void>;
    start(): Promise<void>;
}
export {};
