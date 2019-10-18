const moment = require("moment");

sumthn = [
    {"playerId": "123"},
    {"playerId": "234"},
    {"playerId": "345"}
]

cn = sumthn.map(s => s.playerId);
console.log(cn.includes("122"));

// console.log(moment("2019-10-15 21:59") < moment());

