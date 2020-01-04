import React from 'react'
import { connect } from 'react-redux'
import User from './User'
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom'

const UserList = (props) => {
  if (props.users === undefined) {
    return null
  }
  const { users } = props

  const userById = (id) => users.find(u => u.id === id)

  return (
    <>
      <Route exact path="/users" render={() =>
        <>
          <h3>Users</h3>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Blogs created</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user =>
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      } />
      <Route path="/users/:id" render={({ match }) =>
        <User user={userById(match.params.id)} />
      } />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  }
}

const ConnectedUserList = connect(
  mapStateToProps,
  null,
)(UserList)

export default ConnectedUserList