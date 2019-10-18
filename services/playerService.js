const db = require('../data/db');

module.exports = {
    findPlayers(options) {
        options = { ...options, deleted: false };
        return db.Player.find(options);
    }
}