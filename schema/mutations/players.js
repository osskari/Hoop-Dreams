module.exports = `
    createPlayer(player: PlayerInput!): Player!
    updatePlayer(id: Int! player: PlayerInput!): Player!
    removePlayer(id: Int!): Boolean!
`;