import TelegramBot from "node-telegram-bot-api";
import {getEnvConfig} from "../config/getEnvConfig";

class TelgramBot {
    static instance
    bot
    config
    onCallbackQuery
    onMessage
    onPollingError
    onText

    static getInstance(onCallbackQuery, onMessage, onText, onPollingError, config) {
        if (!TelgramBot.instance) {
            TelgramBot.instance = new TelgramBot(onCallbackQuery, onMessage, onText, onPollingError, config)
        }
        return TelgramBot.instance
    }

    constructor(onCallbackQuery, onMessage, onText, onPollingError, config = null,) {
        this.onCallbackQuery = typeof onCallbackQuery === "function" ? onCallbackQuery : (msg) => {
        }
        this.onMessage = typeof onMessage === "function" ? onMessage : (msg) => {
        }
        this.onPollingError = typeof onPollingError === "function" ? onPollingError : (msg) => {
        }
        this.onText = typeof onText === "function" ? onText : (msg, match) => {
        }
        if (!config || typeof config !== "object" || !config.hasOwnProperty('token')) config = getEnvConfig()
        if (!config.hasOwnProperty('token')) throw new Error("TELEGRAM_TOKEN does not exist")
        this.config = config
        this.init()
    }

    init() {
        const bot = new TelegramBot(this.config.token, {polling: (this.config?.polling) ? this.config.polling : true});
        bot.on("message", this.onMessage)
        bot.on("callback_query", this.onCallbackQuery)
        bot.on("polling_error", this.onPollingError)
        bot.onText(/^\/[A-Za-z0-9]{4,}$/, this.onText);
        this.bot = bot
        return this.bot
    }

    async sendMessage(chatId,text,options = {})  {
       try {
           await this.bot.sendMessage(chatId,text,options)
           //逻辑代码
           return Promise.resolve(true )
       } catch (e) {
           return Promise.reject(e)
       }
    }
    async setCommand(params) {
        try {
            await this.bot.setMyCommands(params);
            //逻辑代码
            return Promise.resolve(true )
        } catch (e) {
            return Promise.reject(e)
        }
    }

    async error(chat_id, err) {
        try {
            await this.sendMessage(chat_id, err.message);
            //逻辑代码
            return Promise.resolve(true )
        } catch (e) {
            return Promise.reject(e)
        }
    }
}

export default TelgramBot.getInstance