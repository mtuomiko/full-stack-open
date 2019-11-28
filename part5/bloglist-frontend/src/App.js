import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null })

  useEffect(() => {
    // Immediately Invoked Async Arrow Function, that's a mouthful.
    // Doesn't look too pretty either...
    (async () => {
      const initialBlogs = await blogService.getAll()
      initialBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(initialBlogs)
    })()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogs.sort((a, b) => b.likes - a.likes)
  }, [blogs])

  const showNotification = (message, type) => {
    const notificationToShow = { message, type }
    setNotification(notificationToShow)
    setTimeout(() => {
      setNotification({ message: null })
    }, 8000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
      showNotification(`Logged in as ${user.username}`)
    } catch (exception) {
      showNotification('Login failure', 'error')
      console.log(exception)
    }
  }

  const handleLogout = () => {
    showNotification(`Logged out as ${user.username}`)
    setUser(null)
    window.localStorage.removeItem('loggedBloglistUser')
  }

  return (
    <div>
      <h2>Bloglist</h2>
      <Notification
        notification={notification}
      />
      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
        /> :
        <div>
          <div>
            Hello there, {user.name}!
            <button id="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </div>

      }

      {user !== null &&
        <>
          <Togglable buttonLabel="Add blog">
            <h3>Add new blog</h3>
            <BlogForm
              blogs={blogs}
              setBlogs={setBlogs}
              showNotification={showNotification}
              user={user}
            />
          </Togglable>
          <div className="bloglist">
            <h3>Blogs</h3>
            {blogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                showNotification={showNotification}
                blogs={blogs}
                setBlogs={setBlogs}
                user={user}
              />
            )}
          </div>
        </>
      }


    </div>
  )
}

export default App