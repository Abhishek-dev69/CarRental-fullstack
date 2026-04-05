import React from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { motion as Motion } from 'motion/react'
import { assets } from '../assets/assets'

const Login = () => {
  const { setShowLogin, axios, setToken, navigate } = useAppContext()

  const [state, setState] = React.useState("login")
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault()
      const { data } = await axios.post(`/api/user/${state}`, { name, email, password })

      if (data.success) {
        navigate('/')
        setToken(data.token)
        localStorage.setItem('token', data.token)
        setShowLogin(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div onClick={() => setShowLogin(false)} className='fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 px-4 backdrop-blur-md'>
      <Motion.form
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        onSubmit={onSubmitHandler}
        onClick={(e)=>e.stopPropagation()}
        className="glass-panel relative flex w-full max-w-md flex-col items-start gap-4 p-8 py-10 text-sm text-slate-600"
      >
        <button type="button" onClick={() => setShowLogin(false)} className='absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 cursor-pointer'>
          <img src={assets.close_icon} alt="Close login modal" />
        </button>

        <span className='eyebrow'>{state === "login" ? "Welcome Back" : "Create Account"}</span>
        <p className="text-3xl font-semibold text-slate-900">
          <span className="text-primary">User</span> {state === "login" ? "Login" : "Sign Up"}
        </p>
        <p className='text-sm leading-7 text-slate-500'>
          Access your bookings, manage your account, and continue where you left off.
        </p>

        {state === "register" && (
          <label className="field-shell flex w-full flex-col gap-2">
            <span className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-500'>Name</span>
            <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" type="text" required />
          </label>
        )}

        <label className="field-shell flex w-full flex-col gap-2">
          <span className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-500'>Email</span>
          <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" type="email" required />
        </label>

        <label className="field-shell flex w-full flex-col gap-2">
          <span className='text-xs font-semibold uppercase tracking-[0.18em] text-slate-500'>Password</span>
          <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" type="password" required />
        </label>

        <p>
          {state === "register" ? "Already have account? " : "Create an account? "}
          <span onClick={() => setState(state === "register" ? "login" : "register")} className="cursor-pointer font-semibold text-primary">
            click here
          </span>
        </p>

        <button className="button-primary w-full cursor-pointer rounded-2xl py-3">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </Motion.form>
    </div>
  )
}

export default Login
