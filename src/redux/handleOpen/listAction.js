import { GET_LIST } from "../types";


export const handleList = (res) => {
    return {
      type: GET_LIST,
      payload: res,
    };
  };