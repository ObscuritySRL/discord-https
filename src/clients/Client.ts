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
  constructor(clientOptions: ClientOptions) {
    super();

    this.authManager = new AuthManager(this, {
      clientId: clientOptions.clientId,
      clientSecret: clientOptions.clientSecret,
    });

    this.clientId = clientOptions.clientId;

    this.fastifyManager = new FastifyManager(this, {
      port: clientOptions.port,
      publicKey: clientOptions.publicKey,
    });
  }

  readonly authManager: AuthManager;

  readonly clientId: string;

  readonly fastifyManager: FastifyManager;

  async start(): Promise<void> {
    await Promise.all([
      this.authManager.start(),
      this.fastifyManager.start(),
    ]);

    this.emit('clientReady');
  }
}
