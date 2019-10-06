module.exports = {
    graphQl: `
        type BasketballField {
            id: ID!
            name: String!
            capacity: Int!
            yearOfCreation: Moment!
            pickupGames: [PickupGame!]!
            status: BasketBallFieldStatus!
        }
    `
}