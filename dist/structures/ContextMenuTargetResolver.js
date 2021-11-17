"use strict";
/* eslint-disable camelcase */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GuildMember_1 = __importDefault(require("./GuildMember"));
const User_1 = __importDefault(require("./User"));
class ContextMenuTargetResolver {
    // eslint-disable-next-line max-len
    constructor(client, target_id, resolved) {
        const member = resolved.members?.[target_id];
        const user = resolved.users?.[target_id];
        this.target = {
            ...member && user ? { member: new GuildMember_1.default(client, { ...member, user }) } : {},
            ...user ? { user: new User_1.default(client, user) } : {},
        };
    }
    /**
     * -------------------------------------------------------
     * * Methods
     * -------------------------------------------------------
     */
    getMember() {
        return this.target.member ?? null;
    }
    // getMessage
    getUser() {
        return this.target.user ?? null;
    }
}
exports.default = ContextMenuTargetResolver;
