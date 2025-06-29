
const bcrypt = require('bcrypt');

const hashPassword = bcrypt.hashSync('Pass2', 7)
console.log(hashPassword);