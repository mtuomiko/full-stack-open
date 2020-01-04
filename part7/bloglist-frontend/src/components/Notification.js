import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Notification = (props) => {
  if (!props.notification) {
    return null
  }

  const { notification, type } = props

  if (notification === null) {
    return null
  }

  const notificationType = (type) ? type : 'info'

  return (
    <div className={notificationType}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification.text,
    type: state.notification.noteType,
  }
}

Notification.propTypes = {
  notification: PropTypes.string.isRequired,
  type: PropTypes.string,
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification