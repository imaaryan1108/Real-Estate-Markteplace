import { authType } from '../utils/actionTypes';

const initState = {
  isLoggedIn: false,
  userName: '',
  userEmail: '',
  pictureUrl: '',
  bearerToken: '',
  isEmailVerified: false,
  userId: '',
  bookmarksChanged: false,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case authType.USER_LOGIN: {
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        userName: action.payload.userName,
        userEmail: action.payload.userEmail,
        pictureUrl: action.payload.pictureUrl,
        isEmailVerified: action.payload.isEmailVerified,
        userId: action.payload.userId,
        bookmarksChanged: action.payload.bookmarkChanged,
      };
    }
    case authType.SET_BEARER_TOKEN: {
      return {
        ...state,
        bearerToken: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
