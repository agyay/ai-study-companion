const express = require('express')
const router = express.Router()
const Quiz = require('../models/Quiz')

// simple seed route (GET) - returns sample quizzes
router.get('/', async (req,res)=> {
  const q = await Quiz.find().limit(10)
  if(!q || q.length===0){
    // return a demo quiz
    return res.json([{
      title:'Algebra Basics',
      questions:[{q:'2+2', options:['3','4','5','6'], answer:1}]
    }])
  }
  res.json(q)
})

module.exports = router
