import React from 'react'
import PropTypes from 'prop-types'
import { createBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { useField } from '../hooks'

const BlogForm = (props) => {
  const { createBlog } = props
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }

    createBlog(newBlog)

    title.reset()
    author.reset()
    url.reset()
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

const mapDispatchToProps = {
  createBlog,
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

const ConnectedBlogForm = connect(
  null,
  mapDispatchToProps,
)(BlogForm)

export default ConnectedBlogForm