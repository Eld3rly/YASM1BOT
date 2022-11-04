import chalk from "chalk";

export default {
    Info: (message: string) => {
        console.log(`${chalk.greenBright('[INFO]')} ${message}`);
    },
    Warn: (message: string) => {
        console.log(`${chalk.yellowBright('[WARN]')} ${message}`);
    },
    Error: (message: string) => {
        console.log(`${chalk.redBright('[ERROR]')} ${message}`);
    }
}