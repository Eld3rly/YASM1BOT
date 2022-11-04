import { Context } from "telegraf";

export type SecretMessage = {
    id: string;
    text: string;
    from: {
        id: number;
        first_name: string;
    };
    to: {
        identifier: string;
    };
    created_at: number;
};

export type Command = {
    name: string,
    description: string,
    usage: string,
    aliases: string[],
    execute: (ctx: Context, args: string[]) => Promise<any>,
    action?: (ctx: Context, data: string[]) => Promise<any>
}