import { NavbarType } from '../utils/actionTypes';

const initState = {
  isDark: false,
};

const navbarReducer = (state = initState, action) => {
  switch (action.type) {
    case NavbarType.TOGGLE_THEME: {
      return {
        ...state,
        isDark: !state.isDark,
      };
    }
    default:
      return state;
  }
};

export default navbarReducer;
