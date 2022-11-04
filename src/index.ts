import { Telegraf } from "telegraf";
import Config from "./config.js";
import ConfigChecker from "./modules/configchecker.js";
import Logs from "./modules/logs.js";
import { Command, SecretMessage } from "./modules/types.js";
import CM from "./modules/cachemanager.js";

import Initalize from "./modules/botinitializer.js";

process.on("unhandledRejection", (err) => Logs.Error(`Unhandled rejection: ${err}`));
process.on("uncaughtException", (err) => Logs.Error(`Uncaught exception: ${err}`));

console.clear();
Logs.Info("YASM | Yet Another Secret Message");
Logs.Info("Telegram bot");

ConfigChecker(Config);

const Commands = global.Commands = new Map<string, Command>();
const Messages = global.Messages = new Map<string, SecretMessage>();
const MessagesTimeout = global.MessagesTimeout = new Map<string, NodeJS.Timeout>();

const bot = new Telegraf(Config.Token);

Initalize(bot);

const BeforeExit = async () => {
    Logs.Info("Exiting...");
    await bot.stop("SIGINT");
    Logs.Info("Bot stopped");
    Logs.Info("Saving messages...");
    await CM.SaveCache();
    Logs.Info("Messages saved");
    process.exit(0);
}

process.on("SIGINT", BeforeExit);
process.on("SIGTERM", BeforeExit);