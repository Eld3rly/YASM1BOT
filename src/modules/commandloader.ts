import { readdirSync } from "fs";
import Logs from "./logs.js";
export default (): void => {
    Logs.Info("Loading commands...");
    readdirSync("./dist/commands").map(async (File) => {
        const Command = (await import(`../commands/${File}`)).default;
        Commands.set(Command.name, Command);
        Logs.Info(`Loaded command ${Command.name}`);
    });
}