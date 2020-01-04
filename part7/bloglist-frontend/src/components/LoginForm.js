import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../reducers/loginReducer'
import { useField } from '../hooks'

const LoginForm = (props) => {
  const { login } = props
  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    login(username.value, password.value)
  }

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

const mapDispatchToProps = {
  login,
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
}

const ConnectedLoginForm = connect(
  null,
  mapDispatchToProps,
)(LoginForm)

export default ConnectedLoginForm