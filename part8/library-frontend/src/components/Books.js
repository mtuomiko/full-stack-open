import React, { useState } from 'react'

const Books = (props) => {
  const { show, result } = props
  const [genreFilter, setGenreFilter] = useState('')

  if (!show) {
    return null
  }

  if (result.loading) {
    return (
      <div>Loading</div>
    )
  }

  const books = result.data.allBooks

  const allGenres = books.map(book => book.genres)
    .reduce((prev, curr) => prev.concat(curr), [])
    .filter((item, i, arr) => arr.indexOf(item) === i)

  const handleGenreFilterChange = (event) => setGenreFilter(event.target.value)

  const visibleBooks = (!genreFilter)
    ? books
    : books.filter(book => book.genres.includes(genreFilter))

  const capitalize = (word) => {
    return word[0].toUpperCase() + word.slice(1)
  }

  return (
    <div>
      <h2>Books</h2>

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
      {allGenres.map(genre =>
        <button
          key={genre}
          onClick={handleGenreFilterChange}
          value={genre}
        >
          {capitalize(genre)}
        </button>
      )}
      <button onClick={handleGenreFilterChange} value="">All genres</button>
    </div>
  )
}

export default Books