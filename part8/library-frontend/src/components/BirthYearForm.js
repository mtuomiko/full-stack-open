import React, { useState } from 'react'

const BirthYearForm = (props) => {
  const { result, setBorn } = props
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return (
      <div>Loading</div>
    )
  }

  const submit = async (e) => {
    e.preventDefault()

    if (name && year) {
      await setBorn({
        variables: {
          name,
          year: Number(year),
        }
      })

      setName('')
      setYear('')
    }

  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          Name
          <select defaultValue={""} onChange={({ target }) => setName(target.value)}>
            <option value="" disabled>CHOOSE</option>
            {authors.map(author =>
              <option key={author.name} value={author.name}>{author.name}</option>
            )}
          </select>
        </div>
        <div>
          Birthyear
          <input
            type='number'
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type='submit'>Update</button>
      </form>
    </div>
  )
}

export default BirthYearForm