const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  name:String,
  email:{type:String, unique:true},
  password:String,
  progress:{type:Number, default:0},
  badges:[String]
})
module.exports = mongoose.model('User', UserSchema)
