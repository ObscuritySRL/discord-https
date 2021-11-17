import { ApplicationCommandOptionType } from '../util/Constants';
import Client from '../clients/Client';
import GuildMember, { GuildMemberData } from './GuildMember';
import User, { UserData } from './User';
interface CommandOption {
    member?: GuildMember;
    name: string;
    type: ApplicationCommandOptionType;
    user?: User;
    value?: boolean | number | string;
}
interface CommandOptionResolverData {
    options?: {
        name: string;
        type: ApplicationCommandOptionType;
        value: string | number | boolean;
    }[];
    name: string;
    type: ApplicationCommandOptionType;
    value?: string | number | boolean;
}
interface CommandOptionResolverDataResolved {
    members?: {
        [key: string]: GuildMemberData;
    };
    users?: {
        [key: string]: UserData;
    };
}
export default class CommandOptionResolver {
    constructor(client: Client, data?: CommandOptionResolverData[], resolved?: CommandOptionResolverDataResolved);
    /**
     * -------------------------------------------------------
     * * Properties
     * -------------------------------------------------------
     */
    readonly options: CommandOption[];
    /**
     * -------------------------------------------------------
     * * Methods
     * -------------------------------------------------------
     */
    get(name: string): CommandOption | null;
    getBoolean(name: string): boolean | null;
    getInteger(name: string): number | null;
    getMember(name: string): GuildMember | null;
    getNumber(name: string): number | null;
    getString(name: string): string | null;
    getUser(name: string): User | null;
}
export {};
