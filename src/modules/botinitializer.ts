import { Telegraf } from "telegraf";
import Logs from "./logs.js";

import InlineQueryHandler from "./inlinequeryhandler.js";
import CallbackkQueryHandler from "./callbackqueryhandler.js";
import CommandLoader from "./commandloader.js";
import CacheManager from "./cachemanager.js";

export default async (bot: Telegraf): Promise<void> => {

    Logs.Info("Initializing bot...");

    CommandLoader(); // Init command loader

    if(await CacheManager.CheckCache()) {
        Logs.Info("Loading messages from cache...");
        await CacheManager.LoadCache();
        Logs.Info("Messages loaded");
    }

    bot.use(async (ctx, next) => {
        if(!global.Me) return; // bot info not loaded yet, ignore :)
        next();
    });
    
    bot.on("message", async (ctx) => {
        if(ctx.chat.type !== "private") return;
        if(!("text" in ctx.message)) return;
    
        const args: string[] = ctx.message.text.split(" ");
        const command: string = args.shift()?.toLowerCase().replace(/^\/+/, "") ?? "";
    
        if(!command) return; // no command?
    
        if(Commands.has(command)) {
            const cmd = Commands.get(command);
            if(!cmd) return;
            cmd.execute(ctx, args);
        }else{
            ctx.reply("⛔ Unknown command");
        }
    });
    
    InlineQueryHandler(bot); // Init inline query handler
    CallbackkQueryHandler(bot); // Init callback query handler
    
    bot.launch().then(async () => {
        const me = await bot.telegram.getMe();
        global.Me = me;
        Logs.Info(`Bot launched as @${me.username}`);
    }).catch((err) => {
        Logs.Error(`Error while launching bot: ${err}`);
        Logs.Error("If the error is \"401: Unauthorized\", then the token is probably entered incorrectly")
    });
}