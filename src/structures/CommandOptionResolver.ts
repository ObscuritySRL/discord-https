import { ApplicationCommandOptionType } from '../util/Constants';

import Client from '../clients/Client';
import GuildMember, { GuildMemberData } from './GuildMember';
import User, { UserData } from './User';

// TODO: Add support for channel and role
interface CommandOption {
  member?: GuildMember;
  name: string;
  type: ApplicationCommandOptionType;
  user?: User;
  value?: boolean | number | string
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
  members?: { [key: string]: GuildMemberData; };
  users?: { [key: string]: UserData; };
}

export default class CommandOptionResolver {
  // eslint-disable-next-line max-len
  constructor(client: Client, data: CommandOptionResolverData[] = [], resolved: CommandOptionResolverDataResolved = {}) {
    this.options = data.map((option) => {
      if (typeof option.value !== 'string') {
        return option;
      }

      const member = resolved.members?.[option.value];
      const user = resolved.users?.[option.value];

      return {
        ...option,
        ...member && user ? { member: new GuildMember(client, { ...member, user }) } : {},
        ...user ? { user: new User(client, user) } : {},
      };
    });
  }

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

  get(name: string): CommandOption | null {
    // eslint-disable-next-line no-shadow
    const option = this.options.find((option) => option.name === name);

    return option ?? null;
  }

  getBoolean(name: string): boolean | null {
    const option = this.get(name);

    return option?.type === ApplicationCommandOptionType.BOOLEAN
      ? option.value as boolean
      : null;
  }

  // getChannel

  getInteger(name: string): number | null {
    const option = this.get(name);

    return option?.type === ApplicationCommandOptionType.INTEGER
      ? option.value as number
      : null;
  }

  getMember(name: string): GuildMember | null {
    const option = this.get(name);

    return option?.type === ApplicationCommandOptionType.USER
      ? option.member ?? null
      : null;
  }

  // getMessage

  getNumber(name: string): number | null {
    const option = this.get(name);

    return option?.type === ApplicationCommandOptionType.NUMBER
      ? option.value as number
      : null;
  }

  // getRole

  getString(name: string): string | null {
    const option = this.get(name);

    return option?.type === ApplicationCommandOptionType.STRING
      ? option.value as string
      : null;
  }

  getUser(name: string): User | null {
    const option = this.get(name);

    return option?.type === ApplicationCommandOptionType.USER
      ? option.user as User
      : null;
  }
}
