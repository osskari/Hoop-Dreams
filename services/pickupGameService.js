const db = require('../data/db');

module.exports = {
    findPickupGames(options){
        options = { ...options, deleted: false};
        return db.PickupGame.find(options);
    }
}