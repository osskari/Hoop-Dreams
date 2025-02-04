const { gql } = require('apollo-server');
const enums = require('./enums');
const inputs = require('./inputs');
const interfaces = require('./interfaces');
const mutations = require('./mutations');
const queries = require('./queries');
const types = require('./types');
const scalar = require('./scalar').graphQl;

module.exports = gql`
    ${scalar}
    ${types}
    ${enums}
    ${inputs}
    ${queries}
    ${mutations}
`;