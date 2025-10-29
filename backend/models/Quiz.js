const mongoose = require('mongoose')
const QuizSchema = new mongoose.Schema({
  title:String,
  questions:[{
    q:String,
    options:[String],
    answer:Number
  }]
})
module.exports = mongoose.model('Quiz', QuizSchema)
