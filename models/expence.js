const mongoose = require('mongoose');

const expenceSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    date:{
        type:Date,
        default:Date.now
    },
    description:String,
    category:String,
    amount:String
})


module.exports = mongoose.model('expence',expenceSchema);