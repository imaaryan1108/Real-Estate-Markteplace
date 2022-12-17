import { NavbarType } from '../utils/actionTypes';

export const toggleTheme = (dispatch) => {
  dispatch({
    type: NavbarType.TOGGLE_THEME,
  });
};
