import React from 'react'
import { connect } from 'react-redux'
import CommentForm from './CommentForm'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom'

const Blog = (props) => {
  if (props.blog === undefined) {
    return null
  }
  const { blog, user, likeBlog, removeBlog, history } = props

  const like = () => {
    likeBlog(blog)
  }

  const remove = () => {
    const confirm = window.confirm(`Remove blog ${blog.title} by author ${blog.author}?`)
    if (confirm) {
      removeBlog(blog)
      history.push('/')
    }
  }

  // User comparison by username, not id. Probably not problematic, username should be unique in db
  return (
    <div>
      <h3>{blog.title}, {blog.author}</h3>
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
      <h3>Comments</h3>
      <CommentForm blog={blog} />
      {!blog.comments.length ?
        <p>No comments yet</p> :
        <ul>
          {blog.comments.map((comment, index) =>
            <li key={index}>{comment}</li>
          )}
        </ul>
      }
      <ul>

      </ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = {
  likeBlog,
  removeBlog,
}

const ConnectedBlog = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Blog)

export default withRouter(ConnectedBlog)