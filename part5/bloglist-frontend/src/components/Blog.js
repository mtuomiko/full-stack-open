import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, showNotification, blogs, setBlogs, user }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleDetailsVisibility = () => {
    setDetailsVisible(!detailsVisible)
  }

  const like = async () => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog)

      // Changing blog to match populated blogs from API i.e. to contain user information (name, username).
      // This way the creator information is available without fetching the info from API separately.
      // Could also change the backend to return populated objects.
      const modifiedBlog = { ...returnedBlog }
      modifiedBlog.user = {
        id: returnedBlog.id,
        name: user.name,
        username: user.username,
      }

      setBlogs(blogs.map(b => (b.id !== blog.id)
        ? b
        : modifiedBlog))
      showNotification(`Liked ${blog.title}`)
    } catch (exception) {
      showNotification(`Error updating ${blog.title}: ${exception}`, 'error')
      console.log(exception)
    }
  }

  const remove = async () => {
    const confirm = window.confirm(`Remove blog ${blog.title} by author ${blog.author}?`)
    if (confirm) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        showNotification(`Removed ${blog.title}`)
      } catch (exception) {
        showNotification(`Error removing ${blog.title}: ${exception.response.data.error}`, 'error')
        console.log(exception)
        console.log(exception.response)
      }
    }
  }

  const simpleView = () => (
    <div className="blog" onClick={toggleDetailsVisibility}>
      {blog.title}, {blog.author}
    </div>
  )

  // User comparison by username, not id. Probably not problematic, username should be unique in db
  const detailView = () => (
    <div className="blog" onClick={toggleDetailsVisibility}>
      <div>{blog.title}, {blog.author}</div>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <button onClick={like}>Like</button>
      </div>
      <div>Added by {blog.user.name}</div>
      {user.username === blog.user.username &&
        <button onClick={remove}>Remove</button>
      }
    </div>
  )

  if (!detailsVisible) {
    return simpleView()
  }

  return detailView()
}

export default Blog