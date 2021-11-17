"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-extraneous-dependencies
require("dotenv/config");
const __1 = require("..");
const client = new __1.Client({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    port: Number(process.env.PORT),
    publicKey: process.env.PUBLIC_KEY,
});
client.on('authManagerReady', () => console.log('Auth Manager Ready'));
client.on('fastifyManagerReady', () => console.log('Fastify Manager Ready'));
client.on('commandInteraction', async (command) => {
    command.defer(false);
    await command.followup({ content: command.name });
});
client.on('contextMenuInteraction', async (contextMenu) => {
    contextMenu.defer(false);
    await contextMenu.followup({ content: contextMenu.name });
});
client.start();
