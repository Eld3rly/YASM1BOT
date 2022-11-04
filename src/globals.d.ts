import { Command, SecretMessage } from "./modules/types.js";
declare global {
	var Me: {[key: string]: any};
	var Messages: Map<string, SecretMessage>;
	var Commands: Map<string, Command>;
	var MessagesTimeout: Map<string, NodeJS.Timeout>;
}

export {}