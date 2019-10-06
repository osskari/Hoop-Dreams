module.exports = `
    createPickupGame(pickupGame: PickupGameInput!): PickupGame!
    removePickupGame(id: Int!): Boolean!
    addPlayerToPickupGame(player: PlayerInput!): Player!
    removePlayerFromPickupGame(id: Int!): Boolean!
`;