import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useField } from '../hooks'

const BlogForm = ({ blogs, setBlogs, showNotification, user }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }
    try {
      const returnedBlog = await blogService.create(newBlog)

      // Changing blog to match populated blogs from API i.e. to contain user information (name, username).
      // This way the creator information is available without fetching the info from API separately.
      const modifiedBlog = { ...returnedBlog }
      modifiedBlog.user = {
        id: returnedBlog.id,
        name: user.name,
        username: user.username,
      }

      setBlogs(blogs.concat(modifiedBlog))
      title.reset()
      author.reset()
      url.reset()
      showNotification(`Added new blog: ${returnedBlog.title}`)
    } catch (exception) {
      showNotification(`Error adding new blog: ${exception}`, 'error')
    }
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        Title
        <input {...title.inputVars} name="Title" />
      </div>
      <div>
        Author
        <input {...author.inputVars} name="Author" />
      </div>
      <div>
        Url
        <input {...url.inputVars} name="Url" />
      </div>
      <button type="submit">Add</button>
    </form>
  )
}

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default BlogForm