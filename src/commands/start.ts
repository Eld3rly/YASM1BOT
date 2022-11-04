import { Command } from "../modules/types.js";
import { Context } from "telegraf";
import Config from "../config.js";

const Start: Command = {
    name: "start",
    description: "Starts the bot",
    usage: "start",
    aliases: ["start"],
    execute: async (ctx: Context, args: string[]) => {
        if(!ctx.from || !ctx.message || !ctx.chat) return;
        if(args[0]){
            const msg = Messages.get(args[0]);
            if(!msg) return ctx.reply("⛔ Message not found!");
            if(msg.from.id === ctx.from.id) return ctx.reply(`🔒 Secret message:\n\n${msg.text}`);
            if(msg.to.identifier !== ctx.from.username && msg.to.identifier !== ctx.from.id.toString()) return ctx.reply("⛔ You are not allowed to view this message!");
            ctx.telegram.editMessageText(undefined,undefined,args[0],`🔓 This message has been read`)
            if(MessagesTimeout.has(msg.id)){
                clearTimeout(MessagesTimeout.get(msg.id));
                MessagesTimeout.delete(msg.id);
            }
            return ctx.reply(`🔒 Secret message:\n\n${msg.text}`);
        }
        await ctx.reply(`🛡️ YASM | Yet Another Secret Message Bot\n🔮Open source bot for sending secret messages in telegram.\n\n📃You can send secret messages using inline queries in chats:\n@${global.Me.username||"me"} (username or id) message\n⌚Messages are stored ${Config.StoreDelay} hours after creation!\n\n⭐ Source code: https://github.com/Eld3rly/yasm1bot\n${Config.Whitelist ? "🔒 Whitelist mode is enabled, only whitelisted users can use the bot" : ""}`);
    }
}

export default Start;