/* eslint-disable no-shadow, no-unused-vars */

import Fastify, { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import FastifyRawBody from 'fastify-raw-body';
import TweetNaCl from 'tweetnacl';

import { ApplicationCommandType, InteractionResponseType, InteractionType } from '../util/Constants';

import Client from '../clients/Client';
import Command, { CommandData } from '../structures/Command';
import ContextMenu, { ContextMenuData } from '../structures/ContextMenu';

interface FastifyManagerOptions {
  port: number;
  publicKey: string;
}

export default class FastifyManager {
  constructor(client: Client, fastifyManagerOptions: FastifyManagerOptions) {
    this.client = client;

    this.fastify.register(FastifyRawBody);

    this.fastify
      .addHook('preHandler', this.verifyRequest.bind(this))
      .addHook('preHandler', this.replyToPing.bind(this));

    this.fastify.post('*', this.handleRequest.bind(this));

    this.port = fastifyManagerOptions.port;

    this.publicKey = Buffer.from(fastifyManagerOptions.publicKey, 'hex');
  }

  /**
   * -------------------------------------------------------
   * * Properties
   * -------------------------------------------------------
   */

  readonly client: Client;

  readonly port: number;

  private readonly publicKey: Buffer;

  readonly fastify = Fastify({ ignoreTrailingSlash: true });

  /**
   * -------------------------------------------------------
   * * Getters/setters
   * -------------------------------------------------------
   */

  // …

  /**
   * -------------------------------------------------------
   * * Fastify events
   * -------------------------------------------------------
   */

  // eslint-disable-next-line class-methods-use-this, max-len
  private handleRequest(request: FastifyRequest<{Body: CommandData | ContextMenuData}>, reply: FastifyReply) {
    switch (request.body.type) {
      case InteractionType.APPLICATION_COMMAND:
        switch (request.body.data.type) {
          case ApplicationCommandType.CHAT_INPUT:
            this.client.emit('command', new Command(this.client, request.body as CommandData, reply));
            break;
          case ApplicationCommandType.MESSAGE:
          case ApplicationCommandType.USER:
            this.client.emit('contextMenu', new ContextMenu(this.client, request.body as ContextMenuData, reply));
            break;
          default:
        }
        break;
        // case InteractionType.MESSAGE_COMPONENT:
        //   // switch (request.body.data.component_type) {
        //     // case MessageComponentTypes.BUTTON:
        //     // eslint-disable-next-line max-len
        // eslint-disable-next-line max-len
        //     //   this.client.emit('buttonInteraction', new ButtonInteraction(this.client, request.body, reply));
        //     //   break;
        //     // case MessageComponentTypes.SELECT_MENU:
        //     //   // TODO: Create SelectMenuInteraction structure
        //     //   break;
        //     default:
        //   }
        // break;
      default:
    }

    // reply.send(request.body);
  }

  // eslint-disable-next-line class-methods-use-this, max-len
  private replyToPing(request: FastifyRequest<{Body: {type: number}}>, reply: FastifyReply, done: HookHandlerDoneFunction) {
    if (request.body.type === InteractionType.PING) {
      return reply.code(200).send({ type: InteractionResponseType.PONG });
    }

    return done();
  }

  // eslint-disable-next-line max-len
  private verifyRequest(request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) {
    const message = Buffer.from(`${request.headers['x-signature-timestamp']}${request.rawBody}`);
    const signature = Buffer.from(`${request.headers['x-signature-ed25519']}`, 'hex');

    const verified = TweetNaCl.sign.detached.verify(message, signature, this.publicKey);

    if (!verified) {
      return reply.code(401).send();
    }

    return done();
  }

  /**
   * -------------------------------------------------------
   * * Methods
   * -------------------------------------------------------
   */

  async start(): Promise<void> {
    await this.fastify.listen({ backlog: 511, host: '::', port: this.port });

    this.client.emit('fastifyManagerReady');
  }
}
