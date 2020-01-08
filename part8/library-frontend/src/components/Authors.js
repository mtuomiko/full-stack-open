import React from 'react'

const Authors = (props) => {
  const { result } = props

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return (
      <div>Loading</div>
    )
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>Authors</h2>
      {!authors || authors.length === 0 ?
        <div>No authors found</div> :
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                Born
            </th>
              <th>
                Books
            </th>
            </tr>
            {authors.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>
      }
    </div>
  )
}

export default Authors