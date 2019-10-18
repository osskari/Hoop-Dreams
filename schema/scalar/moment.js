const { GraphQLScalarType } = require('graphql');
const moment = require('moment');
const { isISO8601 } = require('validator');

const Moment = new GraphQLScalarType({
    name: 'Moment',
    serialize(value) {
        if (isISO8601(value)) {
            return moment(value).format('llll');
        } else {
            throw new Error('Date invalid');
        }
    },
    parseValue(value) {
        if (isISO8601(value)) {
            return value;
        } else {
            throw new Error('Date invalid');
        }
    },
    parseLiteral(value) {
        if (isISO8601(value)) {
            return value;
        } else {
            throw new Error('Date invalid');
        }
    }
});

module.exports = {
    graphQl: `
        scalar Moment
    `,
    Scalar: {
        Moment: Moment
    }
}