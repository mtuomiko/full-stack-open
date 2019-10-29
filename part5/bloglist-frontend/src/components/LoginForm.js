import React from 'react'

const LoginForm = (props) => {
  const {
    handleLogin,
    username,
    handleUsernameChange,
    password,
    handlePasswordChange
  } = props
  return (
    <form onSubmit={handleLogin}>
      <div>
        Username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        Password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm