import { GET_LIST } from "../types";

const initialState = {
  open: false,
  
};

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST:
      return {
        payload: action.payload,
      };
    

    default:
      return state;
  }
};
export default listReducer;