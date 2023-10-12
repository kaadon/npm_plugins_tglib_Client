"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEnvConfig = getEnvConfig;
function getEnvConfig() {
  var _process$env;
  const Options = (_process$env = process.env) === null || _process$env === void 0 ? void 0 : _process$env.TELEGRAM;
  if (!Options) throw new Error("TELEGRAM 配置不存在");
  const telegramOptions = JSON.parse(Options);
  return {
    token: telegramOptions === null || telegramOptions === void 0 ? void 0 : telegramOptions.TOKEN
  };
}