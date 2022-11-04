<!-- Beautiful readme file -->

# YASM1BOT

### [Yet Another Secret Message Bot](https://yasm1bot.t.me/)

A Telegram bot written in typescript that allows you to send secret messages in chats using inline query

## Installation

Clone the repository

```bash
git clone https://github.com/Eld3rly/yasm1bot
```

Install dependencies

```bash
npm install
```

## Usage

```bash
npm start
```

## Configuration file
Path: `src/config.ts`

```typescript
export default {
    Token: "SomeTokenThere", // Your bot's token: @botfather
    Whitelist: [123456789], // If not specified whitelist mode is off
    StoreDelay: 24 // Secret message storage time in hours
} as {
    Token: string,
    Whitelist?: number[],
    StoreDelay: number
};
```
## License

[MIT](https://choosealicense.com/licenses/mit/)