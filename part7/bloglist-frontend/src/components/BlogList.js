import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom'

const BlogList = (props) => {
  const { blogs } = props

  const blogById = (id) => blogs.find(b => b.id === id)

  return (
    <>
        <Route exact path="/" render={() =>
          <>
            <h3>Blogs</h3>
            {blogs.map(blog =>
              <div key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </div>
            )}
          </>
        } />
        <Route path="/blogs/:id" render={({ match }) =>
          <Blog blog={blogById(match.params.id)} />
        } />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  }
}

const ConnectedBlogList = connect(
  mapStateToProps,
  null,
)(BlogList)

export default ConnectedBlogList