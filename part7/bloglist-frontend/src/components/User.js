import React from 'react'

const User = (props) => {
  if (props.user === undefined) {
    return null
  }
  const { user } = props
  return (
    <div>
      <h3>{user.name}</h3>
      {!user.blogs.length ?
        <p>No blogs added</p> :
        <>
          <p>Added blogs</p>
          <ul>
            {user.blogs.map(blog =>
              <li key={blog.id}>{blog.title}</li>
            )}
          </ul>
        </>
      }
    </div>
  )
}

export default User