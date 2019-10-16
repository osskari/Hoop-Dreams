module.exports = `
    createPickupGame(input: PickupGameInput!): PickupGame!
    removePickupGame(id: Int!): Boolean!
    addPlayerToPickupGame(input: PlayerPickupConnectionInput!): PickupGame!
    removePlayerFromPickupGame(input: PlayerPickupConnectionInput!): Boolean!
`;