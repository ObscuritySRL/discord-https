"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GuildMember_1 = __importDefault(require("./GuildMember"));
const User_1 = __importDefault(require("./User"));
class CommandOptionResolver {
    // eslint-disable-next-line max-len
    constructor(client, data = [], resolved = {}) {
        this.options = data.map((option) => {
            if (typeof option.value !== 'string') {
                return option;
            }
            const member = resolved.members?.[option.value];
            const user = resolved.users?.[option.value];
            return {
                ...option,
                ...member && user ? { member: new GuildMember_1.default(client, { ...member, user }) } : {},
                ...user ? { user: new User_1.default(client, user) } : {},
            };
        });
    }
    /**
     * -------------------------------------------------------
     * * Methods
     * -------------------------------------------------------
     */
    get(name) {
        // eslint-disable-next-line no-shadow
        const option = this.options.find((option) => option.name === name);
        return option ?? null;
    }
    getBoolean(name) {
        const option = this.get(name);
        return option?.type === 5 /* BOOLEAN */
            ? option.value
            : null;
    }
    // getChannel
    getInteger(name) {
        const option = this.get(name);
        return option?.type === 4 /* INTEGER */
            ? option.value
            : null;
    }
    getMember(name) {
        const option = this.get(name);
        return option?.type === 6 /* USER */
            ? option.member ?? null
            : null;
    }
    // getMessage
    getNumber(name) {
        const option = this.get(name);
        return option?.type === 10 /* NUMBER */
            ? option.value
            : null;
    }
    // getRole
    getString(name) {
        const option = this.get(name);
        return option?.type === 3 /* STRING */
            ? option.value
            : null;
    }
    getUser(name) {
        const option = this.get(name);
        return option?.type === 6 /* USER */
            ? option.user
            : null;
    }
}
exports.default = CommandOptionResolver;
