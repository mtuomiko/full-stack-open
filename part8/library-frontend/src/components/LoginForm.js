import React, { useState } from 'react'

const LoginForm = (props) => {
  const { login, setToken } = props
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    const result = await login({
      variables: {
        username,
        password,
      }
    })

    if (result) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)

      setUsername('')
      setPassword('')
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          Username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm