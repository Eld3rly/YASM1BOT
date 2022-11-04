import Logs from "./logs.js";

export default (Config: {[key: string]: any}) => {
    if(!Config){
        Logs.Error("Config is undefined bruh");
        process.exit(1);
    }
    if(!Config.Token) {
        Logs.Error("You must specify the bot token in the config file");
        process.exit(1);
    }
    if(!Config.StoreDelay) {
        Logs.Error("You must specify the store delay in the config file");
        process.exit(1);
    }
    if(Config.StoreDelay < 1) {
        Logs.Error("The store delay must be greater than 0 hours");
        process.exit(1);
    }
    if(Config.StoreDelay > 672){
        Logs.Error("The store delay must be less than 672 hours");
        process.exit(1);
    }
    return;
}