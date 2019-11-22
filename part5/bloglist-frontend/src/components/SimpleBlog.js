import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div className="blogDiv">
    <div className="headerDiv">
      {blog.title} {blog.author}
    </div>
    <div className="contentDiv">
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog