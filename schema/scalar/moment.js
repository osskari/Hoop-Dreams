const { GraphQLScalarType } = require('graphql');
const moment = require('moment');

const Moment = new GraphQLScalarType({
    name: 'Moment',
    serialize(value) {
        return moment(value).format('llll');
    },
    parseValue(value) {
        return value;
    },
    parseLiteral(value) {
        return value;
    }
});

module.exports = {
    graphQl: `
        scalar Moment
    `,
    Scalar: Moment
}