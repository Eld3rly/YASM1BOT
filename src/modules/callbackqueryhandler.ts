import { Telegraf } from "telegraf";
import Logs from "./logs.js";

export default (bot: Telegraf) => {
    bot.on("callback_query", async (ctx) => {
        if(!ctx.callbackQuery.inline_message_id) return; // not inline message
        if(!ctx.from) return; // no user?

        const msg = Messages.get(ctx.callbackQuery.inline_message_id);

        if(!msg) return ctx.answerCbQuery("😭 Message has probably expired");  // message not found in cache   

        const CBQData = ctx.callbackQuery.data;

        if(msg.from.id === ctx.from.id) {
            return ctx.answerCbQuery(msg.text, {
                show_alert: CBQData === "SHOW_IT",
                url: CBQData === "OPEN_IT" ? `https://t.me/${global.Me.username}?start=${ctx.callbackQuery.inline_message_id}` : undefined
            });
        }

        if(msg.to.identifier !== ctx.from.id.toString() && msg.to.identifier !== ctx.from.username) return ctx.answerCbQuery("⛔ This message is not for you");

        if(CBQData === "SHOW_IT"){
            if(MessagesTimeout.has(ctx.callbackQuery.inline_message_id)){
                clearTimeout(MessagesTimeout.get(ctx.callbackQuery.inline_message_id));
                MessagesTimeout.delete(ctx.callbackQuery.inline_message_id);
            }
            Messages.delete(ctx.callbackQuery.inline_message_id);
            ctx.editMessageText(`🔓 This message has been read`, {
                reply_markup: {inline_keyboard: []}
            });
        }
        ctx.answerCbQuery(msg.text, {
            show_alert: CBQData === "SHOW_IT",
            url: CBQData === "OPEN_IT" ? `https://t.me/${global.Me.username}?start=${ctx.callbackQuery.inline_message_id}` : undefined
        });
    });
    Logs.Info("Callback query handler loaded!");
};