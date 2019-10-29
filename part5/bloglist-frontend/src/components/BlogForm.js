import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, showNotification, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleAuthorChange = (event) => setAuthor(event.target.value)
  const handleUrlChange = (event) => setUrl(event.target.value)

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
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
      setTitle('')
      setAuthor('')
      setUrl('')
      showNotification(`Added new blog: ${returnedBlog.title}`)
    } catch (exception) {
      showNotification(`Error adding new blog: ${exception}`, 'error')
    }
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        Title
          <input
          type="text"
          value={title}
          name="Title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        Author
          <input
          type="text"
          value={author}
          name="Author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        Url
          <input
          type="text"
          value={url}
          name="Url"
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  )
}

export default BlogForm