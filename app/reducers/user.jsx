import axios from 'axios'


const initialState = {
  allUsers      : [],
  passwordError : false
}

const reducer = (state=initialState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case LIST_ALL_USERS:
      newState.allUsers = action.users
      break

    case UPDATE_PASSWORD_ERROR:
      newState.passwordError = action.bool
      break

    default:
      return state
  }
  return newState
}


const LIST_ALL_USERS = 'LIST_ALL_USERS'

export const listAllUsers = (users) => {
  return {type: LIST_ALL_USERS, users}
}

export const getAllUsers = () => dispatch => {
  axios.get('api/users')
  .then(response => {
    return dispatch(listAllUsers(response.data))
  })
}

const UPDATE_PASSWORD_ERROR = 'UPDATE_PASSWORD_ERROR'

export const passwordError = bool => {
  return {type: UPDATE_PASSWORD_ERROR, bool}
}


export default reducer