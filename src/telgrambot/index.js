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

    static getInstance( onCallbackQuery, onMessage, onText, onPollingError,config) {
        if (!TelgramBot.instance) {
            TelgramBot.instance = new TelgramBot(onCallbackQuery, onMessage, onText, onPollingError,config)
        }
        return TelgramBot.instance
    }

    constructor(onCallbackQuery, onMessage, onText, onPollingError, config = null,) {
        this.onCallbackQuery = typeof onCallbackQuery === "function" ? onCallbackQuery : (msg) => {
        }
        this.onMessage = typeof onMessage === "function" ? onCallbackQuery : (msg) => {
        }
        this.onPollingError = typeof onPollingError === "function" ? onCallbackQuery : (msg) => {
        }
        this.onText = typeof onText === "function" ? onText : (msg, match) => {
        }
        console.log(config)
        if (!config || typeof config !== "object" || !config.hasOwnProperty('token')) config = getEnvConfig()
        if (!config.hasOwnProperty('token')) throw new Error("TELEGRAM_TOKEN does not exist")
        this.config = config
       this._init()
    }

    _init() {
        const bot = new TelegramBot(this.config.token, {polling: (this.config?.polling) ? this.config.polling : true});
        bot.on("message", msg => this.onMessage(msg))
        bot.on("callback_query", msg => this.onCallbackQuery(msg))
        bot.on("polling_error", polling => this.onPollingError)
        bot.onText(/^\/[A-Za-z0-9]{4,}$/, (msg, match) => this.onText);
        this.bot = bot
        return this.bot
    }
}

export default TelgramBot.getInstance