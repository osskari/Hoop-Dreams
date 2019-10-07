const db = require('./data/db').players;

db.find({}, (err, players) => {
    if (err) { throw new Error(err);}
    players.forEach(i => console.log("hebbo: "+i));
})