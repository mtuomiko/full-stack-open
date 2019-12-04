const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = {
  text: '',
}

/** 
 * Uses notification id so we can guarantee that the notification is visible
 * for the duration it is supposed to be. This seemed simpler than clearing 
 * timeouts using the timeout id returned by setTimeout 
 */
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_INFO':
      return {
        text: action.text,
        id: action.id,
      }

    case 'CLEAR_INFO':
      if (action.id === state.id) {
        return {
          text: '',
        }
      }
      return state

    default:
      return state
  }
}

export const showNotification = (text, seconds) => {
  return dispatch => {
    const id = getId()
    dispatch({
      type: 'SHOW_INFO',
      text,
      id,
    })

    setTimeout(() => {
      dispatch({
        type: 'CLEAR_INFO',
        id,
      })
    }, seconds * 1000)
  }
}

export default notificationReducer