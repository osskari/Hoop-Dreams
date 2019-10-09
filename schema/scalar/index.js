const moment = require('./moment');

module.exports ={
    graphQl: `
        ${moment.graphQl}
    `,
    resolve: {
        Moment: moment.Scalar
    }
} ;