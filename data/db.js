const requestPromise = require('request-promise');

// const uri = `https://basketball-fields.herokuapp.com/api/basketball-fields/${id}` ? id : 'https://basketball-fields.herokuapp.com/api/basketball-fields';

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