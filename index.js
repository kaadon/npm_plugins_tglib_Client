const {telegramBot}  = require("./telegramBot");
let bot = telegramBot(
    (msg)=> {
    },
    (msg)=>{},
    (msg,match)=> {
        console.log(msg)
        console.log(match)
    },
    (msg)=>console.log(msg),
    {token:"6377813223:AAGD5q0Vw7yJh4PoAJ_kuE-jIZjdgKTnxZo"})
