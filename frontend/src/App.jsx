import { useState, useEffect } from 'react'
import axios from 'axios'
import { Plus, Trash2, Check, Sparkles } from 'lucide-react'
import confetti from 'canvas-confetti'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) { return twMerge(clsx(inputs)) }

export default function App() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState("")

  const total = tasks.length
  const completedCount = tasks.filter(t => t.completed).length
  const progress = total === 0 ? 0 : Math.round((completedCount / total) * 100)

  const getGradient = () => {
    if (progress === 0) return "from-blue-500 to-cyan-400"
    if (progress < 50) return "from-indigo-500 to-blue-400"
    if (progress < 100) return "from-fuchsia-500 to-purple-500"
    return "from-rose-500 to-orange-400"
  }

  useEffect(() => {
    axios.get('/api/tasks').then(res => setTasks(res.data)).catch(() => {})
  }, [])

  const addTask = async (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    try {
        const res = await axios.post('/api/tasks', { title: inputValue })
        setTasks([...tasks, res.data])
        setInputValue("")
    } catch (e) { console.error(e) }
  }

  const toggleTask = async (id) => {
    const task = tasks.find(t => t.id === id)
    const newTasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    setTasks(newTasks)

    if (!task.completed) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8']
      })
    }
    try { await axios.put(`/api/tasks/${id}/complete`) } catch(e) {}
  }

  const deleteTask = async (id) => {
    setTasks(tasks.filter(t => t.id !== id))
    try { await axios.delete(`/api/tasks/${id}`) } catch(e) {}
  }

  return (
    <div className={cn(
      "min-h-screen w-full flex items-center justify-center p-4 transition-all duration-1000 bg-gradient-to-br",
      getGradient()
    )}>
      <div className="w-full max-w-lg bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-8 text-white">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Vibe Board</h1>
            <p className="text-white/80 text-sm font-medium mt-1">Clear your mind.</p>
          </div>
          <div className="bg-white/20 p-3 rounded-full">
            <Sparkles className="text-yellow-300" />
          </div>
        </div>

        <form onSubmit={addTask} className="relative mb-8">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task..."
            className="w-full bg-black/20 border border-white/10 rounded-xl py-4 pl-4 pr-14 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
          />
          <button type="submit" className="absolute right-2 top-2 bottom-2 bg-white text-indigo-600 p-2 rounded-lg hover:bg-opacity-90 transition-all active:scale-95">
            <Plus size={20} strokeWidth={3} />
          </button>
        </form>

        <div className="mb-6">
          <div className="flex justify-between text-xs font-bold uppercase tracking-wider opacity-80 mb-2">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
            <div className="h-full bg-white transition-all duration-700 ease-out shadow-[0_0_10px_rgba(255,255,255,0.7)]" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Celebration Message - Only shows at 100% */}
        {progress === 100 && (
          <div className="mb-6 text-center animate-bounce">
            <h2 className="text-2xl font-bold text-white drop-shadow-md">
              Yay!! You completed all the tasks! 🎉
            </h2>
          </div>
        )}

        <ul className="space-y-3">
          {tasks.map(task => (
            <li key={task.id} className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-xl border border-white/5 transition-all">
              <button onClick={() => toggleTask(task.id)} className={cn("h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all duration-300", task.completed ? "bg-green-400 border-green-400 scale-110" : "border-white/50 hover:border-white")}>
                {task.completed && <Check size={14} className="text-white" strokeWidth={4} />}
              </button>
              <span className={cn("flex-1 font-medium transition-all duration-300", task.completed ? "text-white/40 line-through" : "text-white")}>{task.title}</span>
              <button onClick={() => deleteTask(task.id)} className="opacity-0 group-hover:opacity-100 p-2 text-white/60 hover:text-red-300 transition-all hover:bg-red-500/20 rounded-lg"><Trash2 size={18} /></button>
            </li>
          ))}
          {tasks.length === 0 && <div className="text-center py-10 text-white/40 italic">No tasks yet. Start the vibe.</div>}
        </ul>
      </div>
    </div>
  )
}