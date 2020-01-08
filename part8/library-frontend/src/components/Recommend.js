import React from 'react'

const Recommend = (props) => {
  const { show, selfResult, booksResult } = props

  if (!show) {
    return null
  }

  if (selfResult.loading || booksResult.loading) {
    return (
      <div>Loading</div>
    )
  }

  const books = booksResult.data.allBooks
  const self = selfResult.data.me

  const visibleBooks = books.filter(book => book.genres.includes(self.favoriteGenre))

  return (
    <div>
      <h2>Recommendations</h2>
      {visibleBooks.length === 0 ?
        <p>No books found in your favorite genre <strong>{self.favoriteGenre}</strong></p> :
        <>
          <p>Books in your favorite genre <strong>{self.favoriteGenre}</strong></p>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>
                  Author
                </th>
                <th>
                  Published
                </th>
              </tr>
              {visibleBooks.map(a =>
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      }
    </div>
  )
}

export default Recommend