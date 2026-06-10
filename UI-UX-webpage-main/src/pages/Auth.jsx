
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './Auth.module.css'

export default function Auth() {

  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login, signup } = useAuth()

  const navigate = useNavigate()


  // ======================
  // HANDLE SUBMIT
  // ======================

  const handleSubmit = async (e) => {

    e.preventDefault()

    setError('')

    // signup validations
    if (mode === 'signup') {

      if (!name.trim()) {
        return setError('Please enter your name')
      }

      if (password.length < 6) {
        return setError('Password must be at least 6 characters')
      }

      if (password !== confirm) {
        return setError('Passwords do not match')
      }

    }

    // common validations
    if (!email.trim()) {
      return setError('Please enter your email')
    }

    if (!password) {
      return setError('Please enter your password')
    }

    setLoading(true)

    try {

      let result

      // LOGIN
      if (mode === 'login') {

        result = await login(
          email.trim(),
          password
        )

      }

      // SIGNUP
      else {

        result = await signup(
          name.trim(),
          email.trim(),
          password
        )

      }

      // ERROR
      if (result.error) {

        setError(result.error)

      }

      // SUCCESS
      else {

        navigate('/dashboard')

      }

    } catch (err) {

      console.log(err)

      setError('Something went wrong')

    }

    setLoading(false)

  }


  // ======================
  // SWITCH MODE
  // ======================

  const switchMode = () => {

    setMode(m => m === 'login' ? 'signup' : 'login')

    setError('')

    setName('')
    setEmail('')
    setPassword('')
    setConfirm('')

  }


  return (

    <div className={styles.page}>

      {/* Background overlay */}
      <div className={styles.overlay} />

      <div className={styles.card}>

        {/* LEFT PANEL */}
        <div className={styles.left}>

          <div className={styles.brand}>
            <span className={styles.brandIcon}>🏡</span>
            <span className={styles.brandName}>SmartNest</span>
          </div>

          <h1 className={styles.tagline}>
            Your home,<br />
            in your hands.
          </h1>

          <p className={styles.tagSub}>
            Control every room, every device,
            every moment — from one simple dashboard.
          </p>

          <div className={styles.features}>

            <div className={styles.feat}>
              <span>💡</span>
              Smart device control
            </div>

            <div className={styles.feat}>
              <span>📊</span>
              Energy monitoring
            </div>

            <div className={styles.feat}>
              <span>🔒</span>
              Door & security
            </div>

            <div className={styles.feat}>
              <span>👥</span>
              Family access
            </div>

          </div>

        </div>


        {/* RIGHT PANEL */}
        <div className={styles.right}>

          <h2 className={styles.formTitle}>
            {
              mode === 'login'
                ? 'Welcome back 👋'
                : 'Create account 🏠'
            }
          </h2>

          <p className={styles.formSub}>
            {
              mode === 'login'
                ? 'Sign in to access your smart home'
                : 'Set up your SmartNest account'
            }
          </p>


          {/* FORM */}
          <form
            className={styles.form}
            onSubmit={handleSubmit}
          >

            {/* NAME */}
            {
              mode === 'signup' && (

                <div className={styles.field}>

                  <label>Full Name</label>

                  <input
                    type="text"
                    placeholder="e.g. Madhu"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                  />

                </div>

              )
            }


            {/* EMAIL */}
            <div className={styles.field}>

              <label>Email Address</label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus={mode === 'login'}
              />

            </div>


            {/* PASSWORD */}
            <div className={styles.field}>

              <label>Password</label>

              <input
                type="password"
                placeholder={
                  mode === 'signup'
                    ? 'Min. 6 characters'
                    : 'Your password'
                }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>


            {/* CONFIRM PASSWORD */}
            {
              mode === 'signup' && (

                <div className={styles.field}>

                  <label>Confirm Password</label>

                  <input
                    type="password"
                    placeholder="Repeat password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                  />

                </div>

              )
            }


            {/* ERROR */}
            {
              error && (

                <div className={styles.error}>
                  ⚠️ {error}
                </div>

              )
            }


            {/* BUTTON */}
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >

              {
                loading
                  ? '...'
                  : mode === 'login'
                    ? 'Sign In'
                    : 'Create Account'
              }

            </button>

          </form>


          {/* SWITCH */}
          <div className={styles.switchRow}>

            {
              mode === 'login'
                ? "Don't have an account?"
                : 'Already have an account?'
            }

            <button
              className={styles.switchBtn}
              onClick={switchMode}
            >

              {
                mode === 'login'
                  ? 'Sign Up'
                  : 'Sign In'
              }

            </button>

          </div>

        </div>

      </div>

    </div>

  )

}
