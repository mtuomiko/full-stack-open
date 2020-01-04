import React from 'react'
import { useField } from '../hooks'
import { addComment } from '../reducers/blogReducer'
import { connect } from 'react-redux'

const CommentForm = (props) => {
  const { blog, addComment } = props

  const comment = useField('text')

  const handleAddComment = (event) => {
    event.preventDefault()
    addComment(blog, comment.value)
  }

  return (
    <form onSubmit={handleAddComment}>
      <div>
        <input {...comment.inputVars} name="Comment" />
        <button type="submit">Add comment</button>
      </div>
    </form>
  )
}

const mapDispatchToProps = {
  addComment,
}

const ConnectedCommentForm = connect(
  null,
  mapDispatchToProps,
)(CommentForm)

export default ConnectedCommentForm