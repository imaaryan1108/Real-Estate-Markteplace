import { generalType } from '../utils/actionTypes';

const initState = {
  activeTab: 0,
  searchQuery: '',
  selectedLocation: 'Delhi',
  selectedType: '',
};

const generalReducer = (state = initState, action) => {
  switch (action.type) {
    case generalType.SET_ACTIVE_TAB: {
      return {
        ...state,
        activeTab: action.payload,
      };
    }
    case generalType.SET_SEARCH_QUERY: {
      return { ...state, searchQuery: action.payload };
    }
    case generalType.SET_SELECTED_LOCAION: {
      return { ...state, selectedLocation: action.payload };
    }
    case generalType.SET_SELECTED_TYPE: {
      return { ...state, selectedType: action.payload };
    }
    default:
      return state;
  }
};

export default generalReducer;
