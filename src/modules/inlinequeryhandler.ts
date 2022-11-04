import { Telegraf } from "telegraf";
import Config from "../config.js";
import Logs from "./logs.js";
import { SecretMessage } from "./types.js";

const CheckAccess = async (userId: any) => {
    if(!Config.Whitelist) return true; // no whitelist, allow everyone
    if(Config.Whitelist.includes(userId)) return true; // user is in whitelist, allow
    return false;
}

export default (bot: Telegraf) => {
    bot.on("inline_query", async (ctx) => {

        if(!CheckAccess(ctx.inlineQuery.from.id)) return; // user is not allowed to use inline queries

        const args = ctx.inlineQuery.query.split(" ");
        if(args.length < 2) return; // User didn't provide enough arguments

        ctx.answerInlineQuery([{
            type: "article",
            id: "1",
            title: "Send secret message",
            description: "Send secret message",
            input_message_content: {
                message_text: `🔒 Secret message for someone`
            },
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: "🔮 Show message",
                        callback_data: `SHOW_IT`
                    }],
                    [{
                        text: "📃 View in bot",
                        callback_data: `OPEN_IT`
                    }]
                ]
            }
        }],{cache_time: 0,is_personal: true});
    });

    bot.on("chosen_inline_result", async (ctx) => {

        if(!ctx.chosenInlineResult.inline_message_id) return; // not inline message
        if(!CheckAccess(ctx.from.id)) return; // user is not allowed to use inline queries

        const args = ctx.chosenInlineResult.query.split(" ");
        const identifier = args.shift()?.replace(/@/g, "").trim();
        if(!identifier) return; // no valid identifier provided

        // Telegram api does not allow to get a user by username and if the person has never used a bot, so there will be no check for the correct identifier
        // If you know how to do it better, pull requesters are always open

        const message = args.join(" ");
        const msg: SecretMessage = {
            id: ctx.chosenInlineResult.inline_message_id,
            text: message,
            from: {
                id: ctx.from.id,
                first_name: ctx.from.first_name
            },
            to: {
                identifier: identifier
            },
            created_at: Date.now()
        };
        Messages.set(msg.id, msg);
        MessagesTimeout.set(msg.id, setTimeout(() => {
            Messages.delete(msg.id);
            MessagesTimeout.delete(msg.id);
        }, Config.StoreDelay * 60 * 60 * 1000));
    });
    Logs.Info("Inline query handler loaded!");
};