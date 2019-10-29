import React from 'react'

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

export default Notification