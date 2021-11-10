import { userConstants } from "../actions/constant";

const initialState = {
  address: [],
  orders: [],
  orderDetails: {},
  loading: false,
  orderFetching: false,
  error: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case userConstants.GET_USER_ADDRESS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.GET_USER_ADDRESS_SUCCESS:
      state = {
        ...state,
        address: action.payload.address,
        loading: false,
      };
      break;
    case userConstants.GET_USER_ADDRESS_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case userConstants.ADD_USER_ADDRESS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.ADD_USER_ADDRESS_SUCCESS:
      state = {
        ...state,
        loading: false,
        address: action.payload.address,
      };
      break;
    case userConstants.ADD_USER_ADDRESS_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case userConstants.GET_USER_ORDERS_REQUEST:
      state = {
        ...state,
        orderFetching: true,
      };
      break;
    case userConstants.GET_USER_ORDERS_SUCCESS:
      state = {
        ...state,
        loading: false,
        orders: action.payload.orders,
      };
      break;
    case userConstants.GET_USER_ORDERS_FAILURE:
      state = {
        ...state,
        loading: false,
        orders: action.payload.orders,
      };
      break;
    case userConstants.GET_USER_ORDER_DETAILS_REQUEST:
      break;
    case userConstants.GET_USER_ORDER_DETAILS_SUCCESS:
      state = {
        ...state,
        orderDetails: action.payload.order,
      };
      break;
    case userConstants.GET_USER_ORDER_DETAILS_FAILURE:
      break;
  }
  return state;
};
