// eslint-disable-next-line import/no-extraneous-dependencies
import 'dotenv/config';

import { Client, Command } from '..';

import ContextMenu from '../structures/ContextMenu';

const client = new Client({
  clientId: process.env.CLIENT_ID as string,
  clientSecret: process.env.CLIENT_SECRET as string,
  port: Number(process.env.PORT as string),
  publicKey: process.env.PUBLIC_KEY as string,
});

client.on('authManagerReady', () => console.log('Auth Manager Ready'));
client.on('fastifyManagerReady', () => console.log('Fastify Manager Ready'));

client.on(
  'command',
  async (command: Command) => {
    command.defer(false);

    await command.followup({ content: `${command.user} used ${command.name}` });
  },
);

client.on(
  'contextMenu',
  async (contextMenu: ContextMenu) => {
    contextMenu.defer(false);

    await contextMenu.followup({
      content:
        `${contextMenu.user} right-clicked ${contextMenu.target.getUser()}`,
    });
  },
);

client.start();
