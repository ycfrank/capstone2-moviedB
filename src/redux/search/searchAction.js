import { GET_RESULTS } from "../types";

export const getResults = (results) => {
  return {
    type: GET_RESULTS,
    payload: results,
  };
};
