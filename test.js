const {Player} = require('./data/db');



Player.find({}, (err, players) => {
    if (err) { throw new Error(err);}
    console.log("Hebbo!!: ", players);
})