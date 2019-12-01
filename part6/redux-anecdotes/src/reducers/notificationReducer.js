
const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW':
      return action.notification
    case 'CLEAR':
      if (action.notification === state) {
        return ''
      }
      return state
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


export const clearNotification = (text) => {
  return {
    type: 'CLEAR',
    notification: text
  }
}

export default notificationReducer