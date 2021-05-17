import {
    TOGGLE_PLAYING
  } from './Types'

  export default (state, action) => {
    switch (action.type) {
      case TOGGLE_PLAYING:
        return {
          ...state,
          playing: action.data
        }
      default:
        return state
    }

  }