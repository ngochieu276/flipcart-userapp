import { productConstant } from "../actions/constant";

const innitialState = {
  products: [],
  priceRange: {},
  productsByPrice: {
    under5m: [],
    under10m: [],
    under15m: [],
    under20m: [],
    under30m: [],
  },
  pageRequest: false,
  page: {},
  error: null,
  productDetails: {},
  loading: false,
};

export default (state = innitialState, action) => {
  switch (action.type) {
    case productConstant.GET_PRODUCT_BY_SLUG:
      state = {
        ...state,
        products: action.payload.products,
        priceRange: action.payload.priceRange,
        productsByPrice: action.payload.productsByPrice,
      };
      break;
    case productConstant.GET_PRODUCT_PAGE_REQUEST:
      state = {
        ...state,
        pageRequest: true,
      };
      break;
    case productConstant.GET_PRODUCT_PAGE_SUCCESS:
      state = {
        ...state,
        page: action.payload.page,
        pageRequest: false,
      };
      break;
    case productConstant.GET_PRODUCT_PAGE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        pageRequest: false,
      };
      break;
    case productConstant.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstant.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
      state = {
        ...state,
        productDetails: action.payload.productDetails,
        loading: false,
      };
      break;
    case productConstant.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
  }
  return state;
};
