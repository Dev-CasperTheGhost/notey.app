import { handleRequest, isSuccess, RequestData } from "@lib/fetch";
import { toast } from "react-toastify";
import { GET_CATEGORIES, SET_LOADING, CREATE_CATEGORY } from "../types";

export const getCategories = (cookie?: string) => async (dispatch) => {
  try {
    const res = await handleRequest("/categories", "GET", {
      cookie,
    });

    if (isSuccess(res)) {
      dispatch({
        type: GET_CATEGORIES,
        categories: res.data.categories,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export const createCategory = (data: RequestData) => async (dispatch): Promise<boolean> => {
  dispatch({ type: SET_LOADING, loading: true });

  try {
    const res = await handleRequest("/categories", "POST", data);

    if (isSuccess(res)) {
      dispatch({
        type: CREATE_CATEGORY,
      });

      toast.success(`Successfully created category with name: ${data.name}`);
      return true;
    } else {
      dispatch({ type: SET_LOADING, loading: false });
      toast.error(res.data.error);
      return false;
    }
  } catch (e) {
    dispatch({ type: SET_LOADING, loading: false });
    toast.error(e?.response?.data?.error);
    return false;
  }
};
