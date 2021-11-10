import axios from "../helper/axios";
import { cartConstants, userConstants } from "./constant";

export const addAddress = (payload) => {
  return async (dispatch) => {
    try {
      console.log(payload);
      dispatch({ type: userConstants.ADD_USER_ADDRESS_REQUEST });
      const res = await axios.post("/user/address/create", { payload });
      if (res.status === 201) {
        const {
          address: { address },
        } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ADDRESS_SUCCESS,
          payload: { address },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ADDRESS_FAILURE,
          payload: { error },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getAddress = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_USER_ADDRESS_REQUEST });
      const res = await axios.get("/user/getAddress");
      if (res.status === 200) {
        const {
          userAddress: { address },
        } = res.data;
        dispatch({
          type: userConstants.GET_USER_ADDRESS_SUCCESS,
          payload: { address },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.GET_USER_ADDRESS_FAILURE,
          payload: { error },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const addOrder = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.ADD_USER_ORDER_REQUEST });
      const res = await axios.post("/user/addOrder", payload);
      if (res.status === 201) {
        dispatch({ type: cartConstants.RESET_CART });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getOrders = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: userConstants.GET_USER_ORDERS_REQUEST });
      const res = await axios.get("/user/getOrders");
      if (res.status === 200) {
        const { orders } = res.data;
        console.log(res.data);
        dispatch({
          type: userConstants.GET_USER_ORDERS_SUCCESS,
          payload: { orders },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDERS_FAILURE,
          payload: { error },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const getOrder = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/user/getOrder`, payload);
      dispatch({ type: userConstants.GET_USER_ORDER_DETAILS_REQUEST });
      if (res.status === 200) {
        console.log(res);
        const { order } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_DETAILS_SUCCESS,
          payload: { order },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_DETAILS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
