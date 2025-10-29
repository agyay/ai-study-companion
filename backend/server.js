const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

// Simple DB connect (if MONGODB_URI provided)
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ai_study'
mongoose.connect(uri).then(()=> console.log('MongoDB connected')).catch(()=> console.log('MongoDB not connected'))

// Models
const User = require('./models/User')
const Quiz = require('./models/Quiz')

// Simple routes
const auth = require('./routes/auth')
const ai = require('./routes/ai')
const quiz = require('./routes/quiz')
app.use('/api/auth', auth)
app.use('/api/ai', ai)
app.use('/api/quiz', quiz)

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log('Server running on', PORT))
