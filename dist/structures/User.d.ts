/**
 * @see {@link https://discord.com/developers/docs/resources/user#user-object}
 */
import Client from '../clients/Client';
export interface UserData {
    accent_color: number;
    avatar: string;
    bot: boolean;
    discriminator: number;
    id: string;
    public_flags: number;
    username: string;
}
export default class User {
    constructor(client: Client, data: UserData);
    /**
     * -------------------------------------------------------
     * * Properties
     * -------------------------------------------------------
     */
    readonly avatar: string;
    readonly avatarURL: string;
    readonly bot: boolean;
    readonly client: Client;
    readonly discriminator: number;
    readonly id: string;
    readonly mention: string;
    readonly publicFlags: number | null;
    readonly tag: string;
    readonly username: string;
    /**
     * -------------------------------------------------------
     * * Methods
     * -------------------------------------------------------
     */
    toString(): string;
}
