"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _nodeTelegramBotApi = _interopRequireDefault(require("node-telegram-bot-api"));
var _getEnvConfig = require("../config/getEnvConfig");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class TelgramBot {
  static getInstance(onCallbackQuery, onMessage, onText, onPollingError, config) {
    if (!TelgramBot.instance) {
      TelgramBot.instance = new TelgramBot(onCallbackQuery, onMessage, onText, onPollingError, config);
    }
    return TelgramBot.instance;
  }
  constructor(onCallbackQuery, onMessage, onText, onPollingError, config = null) {
    _defineProperty(this, "bot", void 0);
    _defineProperty(this, "config", void 0);
    _defineProperty(this, "onCallbackQuery", void 0);
    _defineProperty(this, "onMessage", void 0);
    _defineProperty(this, "onPollingError", void 0);
    _defineProperty(this, "onText", void 0);
    this.onCallbackQuery = typeof onCallbackQuery === "function" ? onCallbackQuery : msg => {};
    this.onMessage = typeof onMessage === "function" ? onCallbackQuery : msg => {};
    this.onPollingError = typeof onPollingError === "function" ? onCallbackQuery : msg => {};
    this.onText = typeof onText === "function" ? onText : (msg, match) => {};
    console.log(config);
    if (!config || typeof config !== "object" || !config.hasOwnProperty('token')) config = (0, _getEnvConfig.getEnvConfig)();
    if (!config.hasOwnProperty('token')) throw new Error("TELEGRAM_TOKEN does not exist");
    this.config = config;
    this._init();
  }
  _init() {
    var _this$config;
    const bot = new _nodeTelegramBotApi.default(this.config.token, {
      polling: (_this$config = this.config) !== null && _this$config !== void 0 && _this$config.polling ? this.config.polling : true
    });
    bot.on("message", msg => this.onMessage(msg));
    bot.on("callback_query", msg => this.onCallbackQuery(msg));
    bot.on("polling_error", polling => this.onPollingError);
    bot.onText(/^\/[A-Za-z0-9]{4,}$/, (msg, match) => this.onText);
    this.bot = bot;
    return this.bot;
  }
}
_defineProperty(TelgramBot, "instance", void 0);
var _default = exports.default = TelgramBot.getInstance;