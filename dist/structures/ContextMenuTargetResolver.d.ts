import Client from '../clients/Client';
import GuildMember, { GuildMemberData } from './GuildMember';
import User, { UserData } from './User';
interface ContextMenuTarget {
    member?: GuildMember;
    user?: User;
}
interface ContextMenuTargetResolverResolved {
    members?: {
        [key: string]: GuildMemberData;
    };
    users?: {
        [key: string]: UserData;
    };
}
export default class ContextMenuTargetResolver {
    constructor(client: Client, target_id: string, resolved: ContextMenuTargetResolverResolved);
    /**
     * -------------------------------------------------------
     * * Properties
     * -------------------------------------------------------
     */
    readonly target: ContextMenuTarget;
    /**
     * -------------------------------------------------------
     * * Methods
     * -------------------------------------------------------
     */
    getMember(): GuildMember | null;
    getUser(): User | null;
}
export {};
