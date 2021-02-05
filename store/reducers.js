import {
  CHANGE_ROUTER,
  CHANGE_SCREEN_WIDTH,
  CHANGE_SCREEN_HEIGHT,
  CHANGE_USER_DATA,
  CHANGE_LOGIN_STATUS,
  CHANGE_CURRENCY,
  CHANGE_LANGUAGE,
  CHANGE_DISPLAY,
  CHANGE_COIN_DISPLAY,
  CHANGE_PIN,
  CHANGE_COIN_NUMBERS,
  CHANGE_SECURE_STATUS,
  CHANGE_CHANGE_WALLET_NAME,
  GET_COIN_SOCKET
} from './actions'

const reducers = function (state = {}, action) {
  if (!Number(state.width) || !Number(state.height)) {
    return {
      ...state,
      width: 1,
      height: 1
    }
  }
  if (action.type === CHANGE_ROUTER) {
    return {
      ...state,
      ...action.payload,
    }
  } else if (action.type === CHANGE_SCREEN_WIDTH) {
    return {
      ...state,
      ...action.payload,
    }
  } else if (action.type === CHANGE_SCREEN_HEIGHT) {
    return {
      ...state,
      ...action.payload,
    }
  } else if (action.type === CHANGE_USER_DATA) {
    return {
      ...state,
      ...action.payload,
    }
  } else if (action.type === CHANGE_LOGIN_STATUS) {
    return {
      ...state,
      ...action.payload,
    }
  } else if (action.type === CHANGE_CURRENCY) {
    return {
      ...state,
      ...action.payload,
    }
  } else if (action.type === CHANGE_LANGUAGE) {
    return {
      ...state,
      ...action.payload,
    }
  } else if (action.type === CHANGE_DISPLAY) {
    return {
      ...state,
      ...action.payload,
    }
  } else if (action.type === CHANGE_COIN_DISPLAY) {
    return {
      ...state,
      ...action.payload,
    }
  } else if (action.type === CHANGE_COIN_NUMBERS) {
    return {
      ...state,
      ...action.payload,
    }
  } else if (action.type === CHANGE_SECURE_STATUS) {
    return {
      ...state,
      ...action.payload,
    }
  } else if (action.type === CHANGE_CHANGE_WALLET_NAME) {
    return {
      ...state,
      ...action.payload,
    }
  } else if (action.type === GET_COIN_SOCKET) {
    return {
      ...state,
      ...action.payload,
    }
  } else if (action.type === CHANGE_PIN) {
    return {
      ...state,
      ...action.payload,
    }
  } else {
    return {
      ...state,
      ...action.payload,
    }
  }
}

export default reducers