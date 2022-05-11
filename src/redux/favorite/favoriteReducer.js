import { GET_FAVORITE } from "../types";

const initialState = {
  userId: "",
  movieId: "",
  movieTitle: "",
  movieImage: "",
  movieRuntime: "",
};

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAVORITE:
      return {
        payload: action.payload,
      };

    default:
      return state;
  }
};

export default favoriteReducer;
