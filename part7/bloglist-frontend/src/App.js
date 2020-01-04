import React, { useEffect } from 'react'
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom'
import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Navigation from './components/Navigation'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { connect } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { logout, checkLogin } from './reducers/loginReducer'

const App = (props) => {
  const {
    initializeBlogs,
    initializeUsers,
    logout,
    checkLogin,
    user,
    users,
  } = props

  useEffect(() => {
    initializeBlogs()
  }, [initializeBlogs])

  useEffect(() => {
    initializeUsers()
  }, [initializeUsers])

  useEffect(() => {
    checkLogin()
  }, [checkLogin])

  const handleLogout = () => {
    logout()
  }

  return (
    <div>
      <Router>
        <Notification />
        
        {user === null ?
          <LoginForm /> :
          <Navigation />
        }

        {user !== null &&
          <>
            <Togglable buttonLabel="Add blog">
              <h3>Add new blog</h3>
              <BlogForm />
            </Togglable>
            <Route path="/" render={() =>
              <div>
                <BlogList />
              </div>
            } />
            <Route exact path="/blogs" render={() =>
              <Redirect to="/" />
            } />
            <Route path="/users" render={() =>
              <UserList />
            } />
          </>
        }
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  initializeUsers,
  logout,
  checkLogin,
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)

export default ConnectedApp