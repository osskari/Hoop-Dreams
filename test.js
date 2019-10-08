Moment = require('moment');
const db = require('./data/db');
const { isISO8601 } = require('validator');

let games = [];
db.PickupGame.find({}, (err, game) => {
    if (err) { throw new Error(err); }
    games = game;
    
}).then(
    i => {
        console.log(games);
        console.log(Moment(games[0].start).toString());
    });


let a = Moment(25-10-1996).format('llll');
let b = Moment('1996-01-28');

console.log('A: ', a);
console.log(isISO8601('1996-10-25'));


console.log(Moment('1996-01-28').toISOString());
console.log(Date(b.toString()));
