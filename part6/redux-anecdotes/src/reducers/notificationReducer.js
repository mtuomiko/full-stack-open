
const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.notification
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export const showNotification = (text) => {
  return {
    type: 'SHOW',
    notification: text
  }
}


export const clearNotification = () => {
  return {
    type: 'CLEAR',
  }
}

export default notificationReducer