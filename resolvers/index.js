const db = require('../data/db');

console.log("hbbo");

db.basketballFields('ef42039e-77bc-40a3-8121-c2a5424ebcdb').then(f => console.log(f)).catch((err) => {console.log(err)});

module.exports = {

}