import { readFileSync, writeFileSync, existsSync } from "fs";
import { SecretMessage } from "./types.js";
import Config from "../config.js";


export default {
    CheckCache: async (): Promise<boolean> => {
        return await existsSync("./dist/cache.json");
    },
    LoadCache: async (): Promise<any> => {
        Messages.clear();
        const cache: SecretMessage[] = JSON.parse(readFileSync("./dist/cache.json", "utf8"));
        for(const msg of cache) {
            Messages.set(msg.id, msg);
            MessagesTimeout.set(msg.id, setTimeout(() => {
                Messages.delete(msg.id);
                MessagesTimeout.delete(msg.id);
            }, Config.StoreDelay * 60 * 60 * 1000 - (Date.now() - msg.created_at)));
        }
    },
    SaveCache: async (): Promise<any> => {
        const cache: SecretMessage[] = [];
        for(const msg of Messages.values()) {
            cache.push(msg);
        }
        writeFileSync("./dist/cache.json", JSON.stringify(cache), "utf8");
    }
}
