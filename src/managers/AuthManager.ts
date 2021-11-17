import Got from 'got';

import Client from '../clients/Client';

interface AuthManagerOptions {
  clientId: string;
  clientSecret: string;
}

interface OAuthToken {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}

export default class AuthManager {
  constructor(client:Client, authManagerOptions:AuthManagerOptions) {
    this.client = client;

    this.clientId = authManagerOptions.clientId;

    this.clientSecret = authManagerOptions.clientSecret;
  }

  /**
   * -------------------------------------------------------
   * * Properties
   * -------------------------------------------------------
   */

  static OAUTH_GRANT_TYPE = 'client_credentials';

  static OAUTH_SCOPE = 'applications.commands.update';

  static OAUTH_URL = 'https://discord.com/api/oauth2/token';

  readonly client: Client;

  readonly clientId: string;

  private readonly clientSecret: string;

  private oAuthToken: OAuthToken = {
    access_token: '', expires_in: 0, scope: '', token_type: '',
  };

  /**
   * -------------------------------------------------------
   * * Getters/setters
   * -------------------------------------------------------
   */

  get accessToken(): string {
    return this.oAuthToken.access_token;
  }

  get authorization(): string {
    return `${this.oAuthToken.token_type} ${this.oAuthToken.access_token}`;
  }

  /**
   * -------------------------------------------------------
   * * Methods
   * -------------------------------------------------------
   */

  async login(): Promise<void> {
    this.oAuthToken = await Got.post(AuthManager.OAUTH_URL, {
      form: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: AuthManager.OAUTH_GRANT_TYPE,
        scope: AuthManager.OAUTH_SCOPE,
      },
    }).json<OAuthToken>();

    setTimeout(this.login.bind(this), this.oAuthToken.expires_in * 1000);
  }

  async start(): Promise<void> {
    await this.login();

    this.client.emit('authManagerReady');
  }
}
