# discord-https
A powerful library for receiving and responding to Discord HTTPS interactions.

## Installation

```bash
npm i https://github.com/ObscuritySRL/discord-https
```

## Usage

```ts
import { Client } from 'discord-https';

// Initiate a client
const client = new Client({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  port: PORT,
  publicKey: PUBLIC_KEY,
});

// Listen to manager events
client.on('authManagerReady', () => console.log('Auth Manager Ready'));
client.on('fastifyManagerReady', () => console.log('Fastify Manager Ready'));

// Listen for commands
client.on(
  'command',
  async (command: Command) => {
    command.defer(false);

    await command.followup({ content: `${command.user.username} used ${command.name}` });
  },
);

// Listen for context menus
client.on(
  'contextMenu',
  async (contextMenu: ContextMenu) => {
    contextMenu.defer(false);

    await contextMenu.followup({
      content:
        `${contextMenu.user.username} right-clicked ${contextMenu.target.getUser()?.username}`,
    });
  },
);

client.start();

```