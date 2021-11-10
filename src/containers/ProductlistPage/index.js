import React, { Fragment, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import getParams from "../../utils/getParams";
import { ProductStore } from "./ProductStore";
import { ProductPage } from "./ProductPage";
import "./style.css";
import { ClothingAndAccessories } from "./ClothingAndAccessories";

/**
* @author
* @function ProductlistPage

**/

const ProductlistPage = (props) => {
  const renderProduct = () => {
    console.log(props);
    const params = getParams(props.location.search);
    console.log(params);

    let content = null;
    switch (params.type) {
      case "page":
        content = <ProductPage {...props} />;
        break;
      case "store":
        content = <ProductStore {...props} />;
        break;
      default:
        content = <ClothingAndAccessories {...props} />;
    }
    return content;
  };

  return <Layout>{renderProduct()}</Layout>;
};

export default ProductlistPage;
