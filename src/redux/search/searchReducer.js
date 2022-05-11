import { GET_RESULTS } from "../types";

const initialState = {
  result: [],
  
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RESULTS:
      return {
        payload: action.payload,
      };
    

    default:
      return state;
  }
};
export default searchReducer;
