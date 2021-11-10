import axios from "../helper/axios";
import { authConstant, productConstant } from "./constant";

export const getProductBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axios.get(`/products/${slug}`);
    if (res.status === 200) {
      dispatch({
        type: productConstant.GET_PRODUCT_BY_SLUG,
        payload: res.data,
      });
    } else {
    }
  };
};

export const getProductPage = (payload) => {
  const { cid, type } = payload.params;
  return async (dispatch) => {
    dispatch({ type: productConstant.GET_PRODUCT_PAGE_REQUEST });
    const res = await axios.get(`/page/${cid}/${type}`);

    if (res.status === 200) {
      const { page } = res.data;
      console.log(page);
      dispatch({
        type: productConstant.GET_PRODUCT_PAGE_SUCCESS,
        payload: { page },
      });
    } else {
      const { error } = res.data;
      dispatch({
        type: productConstant.GET_PRODUCT_PAGE_SUCCESS,
        payload: { error },
      });
    }
  };
};

export const getProductDetailsById = (payload) => {
  return async (dispatch) => {
    dispatch({ type: productConstant.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
    let res;
    try {
      const { productId } = payload.params;
      res = await axios.get(`/product/${productId}`);
      dispatch({
        type: productConstant.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
        payload: { productDetails: res.data.product },
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: productConstant.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
