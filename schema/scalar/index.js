const moment = require('./moment');

module.exports ={
    graphQl: `
        ${moment.graphQl}
    `,
    scalar: {
        moment: moment.scalar
    }
} ;