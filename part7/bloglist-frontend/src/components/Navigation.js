import React from 'react'
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../reducers/loginReducer'

const Navigation = (props) => {
  const { user, logout } = props

  const handleLogout = () => {
    logout()
  }

  return (
    <div>
      <div>
        <Link to="/">Blogs</Link>&nbsp;
        <Link to="/users">Users</Link>&nbsp;
        {user.name} logged in
        <button id="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <h2>Blog app</h2>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  logout,
}

const ConnectedNavigation = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navigation)

export default ConnectedNavigation