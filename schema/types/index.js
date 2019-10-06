const player = require('./player').graphQl;
const pickupGame = require('./pickupGame').graphQl;
const basketballField = require('./basketballField').graphQl;

module.exports = `
    ${player}
    ${pickupGame}
    ${basketballField}
`;