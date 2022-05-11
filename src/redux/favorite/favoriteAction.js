import { GET_FAVORITE } from "../types";

export const getFavorite = (favorite) => {
  return {
    type: GET_FAVORITE,
    payload: favorite,
  };
};
