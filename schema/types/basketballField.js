module.exports = {
    graphQl: `
        type BasketballField {
            id: ID!
            name: String!
            capacity: Int!
            yearOfCreation: Boolean!
            pickupGames: [PickupGame!]!
            status: BasketballFieldStatus!
        }
    `
}