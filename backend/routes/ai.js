const express = require('express')
const router = express.Router()
const { Configuration, OpenAIApi } = require('openai')
const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY })
const openai = new OpenAIApi(config)

router.post('/ask', async (req,res)=> {
  const {question} = req.body
  if(!question) return res.json({error:'No question'})
  try{
    // Use OpenAI chat completion (ensure OPENAI_API_KEY set). This is minimal example.
    const resp = await openai.createChatCompletion({
      model: 'gpt-4o-mini', // placeholder — change as needed
      messages: [{role:'user', content: question}],
      max_tokens: 400
    })
    const answer = resp.data.choices?.[0]?.message?.content || 'No answer'
    res.json({answer})
  }catch(e){
    console.error(e)
    res.json({error: e.message || String(e)})
  }
})

module.exports = router
