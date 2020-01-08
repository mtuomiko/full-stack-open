import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/react-hooks'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import BirthYearForm from './components/BirthYearForm'
import Recommend from './components/Recommend'

const ALL_AUTHORS = gql`
  {
    allAuthors {
      id
      name
      born
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  {
    allBooks {
      id
      title
      published
      author {
        id
        name
      }
      genres
    }
  }
`

const NEW_BOOK = gql`
  mutation newBook(
    $title: String!,
    $published: Int!,
    $author: String!,
    $genres: [String!]!
  ) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      id
      title
      published
      author {
        id
        name
      }
      genres
    }
  }
`

const SET_BORN = gql`
  mutation setBorn($name: String!, $year: Int!) {
    editAuthor(name: $name, setBornTo: $year) {
      id
      name
      born
      bookCount
    } 
  }
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

const SELF = gql`
  {
    me {
      favoriteGenre
    }
  }
`

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      id
      title
      published
      author {
        id
        name
      }
      genres
    }
  }
`

const AUTHOR_ADDED = gql`
  subscription {
    authorAdded {
      id
      name
      born
      bookCount
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const client = useApolloClient()

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const self = useQuery(SELF)

  const includedIn = (set, object) => {
    return set.map(p => p.id).includes(object.id)
  }

  const updateCacheWithBook = (addedBook) => {
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      const updatedData = [...dataInStore.allBooks, addedBook]
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: updatedData },
      })
      const authorsData = client.readQuery({ query: ALL_AUTHORS })
      const authorToUpdate = authorsData.allAuthors.find(a => a.id === addedBook.author.id)
      const modifiedAuthor = {
        ...authorToUpdate,
        bookCount: authorToUpdate.bookCount + 1
      }
      const updatedAuthors = authorsData.allAuthors.map(a => a.id === modifiedAuthor.id ? modifiedAuthor : a)
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors: updatedAuthors },
      })
    }
  }

  const updateCacheWithAuthor = (author) => {
    const dataInStore = client.readQuery({ query: ALL_AUTHORS })
    if (!includedIn(dataInStore.allAuthors, author)) {
      console.log("inside new")
      const dataWithNewAuthor = [...dataInStore.allAuthors, author]
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors: dataWithNewAuthor },
      })
    } else {
      console.log("inside existing")
      const oldAuthors = dataInStore.allAuthors
      const dataWithModifiedAuthor = oldAuthors.map(a => (a.id === author.id) ? author : a)
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors: dataWithModifiedAuthor },
      })
      console.log(client.readQuery({ query: ALL_AUTHORS }))
    }
  }

  /*const [addBook] = useMutation(NEW_BOOK, {
    refetchQueries: [
      { query: ALL_AUTHORS },
      { query: ALL_BOOKS },
    ]
  })*/
  const [addBook] = useMutation(NEW_BOOK, {
    update: (store, response) => {
      updateCacheWithBook(response.data.addBook)
    }
  })

  const [setBorn] = useMutation(SET_BORN, {
    /*refetchQueries: [
      { query: ALL_AUTHORS },
    ]*/
    update: (store, response) => {
      updateCacheWithAuthor(response.data.editAuthor)
    }
  })

  const [login] = useMutation(LOGIN)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded
      window.alert(`A book called ${book.title} by ${book.author.name} was just added!`)
      updateCacheWithBook(book)
    }
  })

  useSubscription(AUTHOR_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const author = subscriptionData.data.authorAdded
      window.alert(`The author ${author.name} was just added!`)
      updateCacheWithAuthor(author)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>Authors</button>
        <button onClick={() => setPage('books')}>Books</button>
        {!token ?
          <button onClick={() => setPage('login')}>Login</button> :
          <>
            <button onClick={() => setPage('add')}>Add book</button>
            <button onClick={() => setPage('changeYear')}>Set birthyear</button>
            <button onClick={() => setPage('recommend')}>Recommend</button>
            <button onClick={logout}>Logout</button>
          </>
        }

      </div>

      <Authors
        show={page === 'authors'}
        result={authors}
      />

      <Books
        show={page === 'books'}
        result={books}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

      <BirthYearForm
        show={page === 'changeYear'}
        result={authors}
        setBorn={setBorn}
      />

      <LoginForm
        show={page === 'login'}
        login={login}
        setToken={(token => setToken(token))}
      />

      <Recommend
        show={page === 'recommend'}
        selfResult={self}
        booksResult={books}
      />
    </div>
  )
}

export default App