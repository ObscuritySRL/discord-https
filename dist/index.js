"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Webhook = exports.User = exports.Payload = exports.Message = exports.Member = exports.Embed = exports.CommandOptionResolver = exports.Command = exports.Attachment = exports.FastifyManager = exports.AuthManager = exports.Client = void 0;
// "Root" classes (starting points)
var Client_1 = require("./clients/Client");
Object.defineProperty(exports, "Client", { enumerable: true, get: function () { return __importDefault(Client_1).default; } });
// Utilities
// export { default as Constants } from './util/Constants';
// Managers
var AuthManager_1 = require("./managers/AuthManager");
Object.defineProperty(exports, "AuthManager", { enumerable: true, get: function () { return __importDefault(AuthManager_1).default; } });
var FastifyManager_1 = require("./managers/FastifyManager");
Object.defineProperty(exports, "FastifyManager", { enumerable: true, get: function () { return __importDefault(FastifyManager_1).default; } });
// Structures
var Attachment_1 = require("./structures/Attachment");
Object.defineProperty(exports, "Attachment", { enumerable: true, get: function () { return __importDefault(Attachment_1).default; } });
var Command_1 = require("./structures/Command");
Object.defineProperty(exports, "Command", { enumerable: true, get: function () { return __importDefault(Command_1).default; } });
var CommandOptionResolver_1 = require("./structures/CommandOptionResolver");
Object.defineProperty(exports, "CommandOptionResolver", { enumerable: true, get: function () { return __importDefault(CommandOptionResolver_1).default; } });
var Embed_1 = require("./structures/Embed");
Object.defineProperty(exports, "Embed", { enumerable: true, get: function () { return __importDefault(Embed_1).default; } });
var GuildMember_1 = require("./structures/GuildMember");
Object.defineProperty(exports, "Member", { enumerable: true, get: function () { return __importDefault(GuildMember_1).default; } });
var Message_1 = require("./structures/Message");
Object.defineProperty(exports, "Message", { enumerable: true, get: function () { return __importDefault(Message_1).default; } });
var Payload_1 = require("./structures/Payload");
Object.defineProperty(exports, "Payload", { enumerable: true, get: function () { return __importDefault(Payload_1).default; } });
var User_1 = require("./structures/User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return __importDefault(User_1).default; } });
var Webhook_1 = require("./structures/Webhook");
Object.defineProperty(exports, "Webhook", { enumerable: true, get: function () { return __importDefault(Webhook_1).default; } });
