const player = require('./PlayerInput');
const signupPlayer = require('./signupPlayerInput');
const pickupGame = require('./pickupGameInput');
const playerPickupConnection = require('./playerPickupConnectionInput');

module.exports = `
    ${player}
    ${signupPlayer}
    ${pickupGame}
    ${playerPickupConnection}
`;