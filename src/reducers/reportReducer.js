import { SET_DISTRIC_LIST ,SET_REPORT_DATA, SET_HOSPITALS_LISTS_DATA} from "../constants/action-types";

const initialState = {
  hospitalLits: [],
  reportData: [],
  hospitalsByDistrict: [],

};

function reportReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DISTRIC_LIST:
      state.hospitalLits = action.payload;
      return state;
      
    case SET_REPORT_DATA:
      state.reportData = action.payload;
      return state;
    case SET_HOSPITALS_LISTS_DATA:
      state.hospitalsByDistrict = action.payload;
      return state;

    default:
      return state;
  }
}

export default reportReducer;
