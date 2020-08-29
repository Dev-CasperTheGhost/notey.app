import { SET_MESSAGE, CLEAR_MESSAGE } from "../utils/types";

const initState = {
  content: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    case SET_MESSAGE:
      return {
        ...state,
        content: action.message,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        content: null,
      };
    default:
      return {
        ...state,
      };
  }
}
