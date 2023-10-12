export function getEnvConfig(){
    const Options = process.env?.TELEGRAM
    if (!Options) throw new Error("TELEGRAM 配置不存在");
    const telegramOptions = JSON.parse(Options)
    return {
        token:telegramOptions?.TOKEN,
    }
}