/* eslint-disable camelcase */

import Client from '../clients/Client';
import GuildMember, { GuildMemberData } from './GuildMember';
import User, { UserData } from './User';

// TODO: Add support for channel and role
interface ContextMenuTarget {
  member?: GuildMember;
  user?: User;
}

interface ContextMenuTargetResolverResolved {
  members?: {[key:string]: GuildMemberData};
  users?: {[key:string]: UserData};
}

export default class ContextMenuTargetResolver {
  // eslint-disable-next-line max-len
  constructor(client: Client, target_id: string, resolved: ContextMenuTargetResolverResolved) {
    const member = resolved.members?.[target_id];
    const user = resolved.users?.[target_id];

    this.target = {
      ...member && user ? { member: new GuildMember(client, { ...member, user }) } : {},
      ...user ? { user: new User(client, user) } : {},
    };
  }

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

  getMember(): GuildMember | null {
    return this.target.member ?? null;
  }

  // getMessage

  getUser(): User | null {
    return this.target.user ?? null;
  }
}
