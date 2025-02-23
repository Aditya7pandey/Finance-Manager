const mongoose = require('mongoose');
const expence = require('./expence');
mongoose.connect('mongodb://127.0.0.1:27017/financeApp');

const userSchema = mongoose.Schema({
    name:String,
    userName:String,
    email:String,
    password:String,
    expence:[{type:mongoose.Schema.Types.ObjectId, ref:'expence'}]
})

module.exports = mongoose.model('user',userSchema);