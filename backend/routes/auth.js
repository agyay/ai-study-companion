const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const JWT_SECRET = process.env.JWT_SECRET || 'secret'

router.post('/register', async (req,res)=> {
  try{
    const {name,email,password} = req.body
    const existing = await User.findOne({email})
    if(existing) return res.json({error:'User exists'})
    const hash = await bcrypt.hash(password, 8)
    const user = await User.create({name,email,password:hash})
    res.json({ok:true})
  }catch(e){ res.json({error:e.message}) }
})

router.post('/login', async (req,res)=> {
  try{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(!user) return res.json({error:'No user'})
    const match = await bcrypt.compare(password, user.password)
    if(!match) return res.json({error:'Invalid creds'})
    const token = jwt.sign({id:user._id, email:user.email}, JWT_SECRET, {expiresIn:'7d'})
    res.json({token, user:{name:user.name, email:user.email}})
  }catch(e){ res.json({error:e.message})}
})

module.exports = router
