import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null
  }

  const notificationType = (notification.type) ? notification.type : 'info'

  return (
    <div className={notificationType}>
      {notification.message}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.object.isRequired,
}

export default Notification