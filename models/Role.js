const {Schema, model} = require ('mongoose');

const Role = ({
    value: {type: String, unique: true, default:'USER'}
})
module.exports = model('Role', Role)