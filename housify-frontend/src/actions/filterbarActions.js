import { filterbarType } from "../utils/actionTypes";

export const toggleFilter = (dispatch) => {
  dispatch({
    type: filterbarType.TOGGLE_FILTER,
  });
};
