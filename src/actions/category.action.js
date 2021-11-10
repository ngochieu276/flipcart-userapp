import axios from "../helper/axios";
import { authConstant, categoryConstant } from "./constant";

export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstant.GET_ALL_CATEGORIES_REQUEST });
    const res = await axios.get("/category/getCategory");
    console.log(res);
    if (res.status === 200) {
      const { categoriesList } = res.data;
      dispatch({
        type: categoryConstant.GET_ALL_CATEGORIES_SUCCESS,
        payload: { categories: categoriesList },
      });
    } else {
      dispatch({
        type: categoryConstant.GET_ALL_CATEGORIES_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
