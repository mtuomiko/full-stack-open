import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
  const {
    handleLogin,
    username,
    password,
  } = props
  return (
    <form onSubmit={handleLogin}>
      <div>
        Username
        <input {...username.inputVars} name="Username" />
      </div>
      <div>
        Password
        <input {...password.inputVars} name="Password" />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
}

export default LoginForm