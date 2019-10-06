const requestPromise = require('request-promise');

const connectionString = 'mongodb+srv://admin:admin123@hoops-aj2kw.mongodb.net/admin?retryWrites=true&w=majority'

module.exports = {
    basketballFields: (id) => {
        let uri = 'https://basketball-fields.herokuapp.com/api/basketball-fields';
        if(id != undefined){ uri += `/${id}` }
        return requestPromise({
        uri: uri,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    }
    )},
    pickupGames: [],
    players: []
}