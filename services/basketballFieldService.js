const requestPromise = require('request-promise');
const errors = require('../errors');
const Moment = require('moment');

const BasketballFieldService = () => {
    const getAllBasketballFields = async (cb, errCb) => {
        try {
            await requestPromise({
                uri: 'https://basketball-fields.herokuapp.com/api/basketball-fields',
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            }).then( data => cb(data) );
        } catch(err) { errCb(err); }
    };

    const getBasketballFieldById = async (id, cb, errCb) => {
        if(!id){ errCb('No id given'); }
        try {
            await requestPromise({
                uri: `https://basketball-fields.herokuapp.com/api/basketball-fields/${id}`,
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            }).then( data => cb(data) );
        } catch(err) { errCb(err); }
    };

    return {
        getAllBasketballFields,
        getBasketballFieldById
    }
};

module.exports = BasketballFieldService();

// Examples

// BasketballFieldService().getAllBasketballFields(
//     (data) => {
//         let arr = [];
//         data.forEach(i => {
//             arr.push({
//                 id: i.id,
//                 name: i.name,
//                 capacity: i.capacity,
//                 yearOfCreation: Moment(i.yearOfCreation).toISOString(),
//                 status: i.status
//             });
//         });
//         console.log(arr);
//         return arr;
//     },
//     (err) => {
//         console.log(err)
//     }
// );

// BasketballFieldService().getBasketballFieldById('647ffc67-265c-40a4-84c9-ccdcd2fdeac7', 
//     (data) => {
//         console.log(data);
//         return {
//             id: data.id,
//             name: data.name,
//             capacity: data.capacity,
//             yearOfCreation: Moment(data.yearOfCreation).toISOString(),
//             status: data.status
//         };
//     },
//     (err) => { console.log(err); }
// );
