import React, { useState, useEffect } from 'react'

export default function App(){
  const [route, setRoute] = useState('home')
  const [name, setName] = useState('Student')
  const [progress, setProgress] = useState(32)
  const [aiResponse, setAiResponse] = useState('')
  const [question, setQuestion] = useState('')
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  useEffect(()=> {
    if(token) localStorage.setItem('token', token)
  }, [token])

  async function askAI(){
    if(!question) return alert('Type a question')
    try{
      const res = await fetch('/api/ai/ask', {
        method:'POST',
        headers:{'Content-Type':'application/json', 'authorization': token ? 'Bearer '+token : ''},
        body: JSON.stringify({question})
      })
      const data = await res.json()
      if(data.error) setAiResponse('Error: ' + data.error)
      else setAiResponse(data.answer || JSON.stringify(data))
    }catch(e){
      setAiResponse('Request failed: '+e.message)
    }
  }

  async function loginDemo(){
    // quick demo login (registers and logs in a demo user)
    try{
      const reg = await fetch('/api/auth/register',{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name:'Demo', email:'demo@example.com', password:'password'})})
      const jr = await reg.json()
    }catch(e){}
    const res = await fetch('/api/auth/login',{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email:'demo@example.com', password:'password'})})
    const j = await res.json()
    if(j.token){
      setToken(j.token)
      setName('Demo Student')
      alert('Logged in as demo')
    }else{
      alert('Login failed')
    }
  }

  return (
    <div className="min-h-screen font-sans text-slate-800">
      <header className="max-w-6xl mx-auto p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-400 flex items-center justify-center text-white font-bold">AI</div>
          <div>
            <div className="text-lg font-semibold">AI Study Companion</div>
            <div className="text-xs text-slate-500">Personalized EdTech for Every Student</div>
          </div>
        </div>
        <nav className="flex items-center gap-4">
          <button onClick={()=>setRoute('home')} className="px-3 py-2 rounded">Home</button>
          <button onClick={()=>setRoute('dashboard')} className="px-3 py-2 rounded">Dashboard</button>
          <button onClick={()=>setRoute('architecture')} className="px-3 py-2 rounded">Architecture</button>
          <button onClick={()=>setRoute('contact')} className="px-3 py-2 rounded">Contact</button>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {route==='home' && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-extrabold">AI Study Companion — your 24/7 personalized tutor</h1>
              <p className="mt-4 text-slate-600">Adaptive lessons, instant doubt-solving, smart schedules and gamified learning.</p>
              <div className="mt-6 flex gap-3">
                <button onClick={()=>setRoute('dashboard')} className="px-5 py-3 bg-indigo-600 text-white rounded-lg">Try the Demo</button>
                <button onClick={loginDemo} className="px-5 py-3 border rounded-lg">Login Demo</button>
              </div>
            </div>

            <div>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-slate-500">Welcome,</div>
                    <div className="text-xl font-bold">{name}</div>
                  </div>
                  <div className="text-sm text-slate-500">Streak: <span className="font-semibold">7 days</span></div>
                </div>
                <div className="mt-6">
                  <div className="text-xs text-slate-500">Learning Progress</div>
                  <div className="w-full bg-slate-200 h-3 rounded-full mt-2">
                    <div style={{width: `${progress}%`}} className="h-3 rounded-full bg-indigo-600" />
                  </div>
                  <div className="mt-6">
                    <div className="text-xs text-slate-500">Ask the AI</div>
                    <div className="mt-2 flex gap-2">
                      <input value={question} onChange={e=>setQuestion(e.target.value)} placeholder="Type a question..." className="flex-1 border rounded px-3 py-2" />
                      <button onClick={askAI} className="px-4 py-2 bg-cyan-600 text-white rounded">Ask</button>
                    </div>
                    <div className="mt-3 bg-slate-50 p-3 rounded text-sm text-slate-700">{aiResponse || 'AI answers will appear here.'}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {route==='dashboard' && (
          <section>
            <h2 className="text-2xl font-bold">Demo Dashboard</h2>
            <p className="text-slate-500 mt-2">A working demo connected to a local backend.</p>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="col-span-2 bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500">Performance</div>
                    <div className="text-xl font-bold">Consistent improvement</div>
                  </div>
                  <div>
                    <div className="text-sm">Accuracy</div>
                    <div className="text-2xl font-bold">78%</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-xs text-slate-500">Leaderboard</div>
                <div className="mt-3">Demo Student — 78%</div>
              </div>
            </div>
          </section>
        )}

        {route==='architecture' && (
          <section>
            <h2 className="text-2xl font-bold">System Architecture</h2>
            <p className="text-slate-500 mt-2">Backend + AI engine + frontend.</p>
          </section>
        )}

        {route==='contact' && (
          <section>
            <h2 className="text-2xl font-bold">Contact</h2>
            <p className="text-slate-500 mt-2">This is a demo full-stack scaffold. See README in the zip for setup.</p>
          </section>
        )}

      </main>
    </div>
  )
