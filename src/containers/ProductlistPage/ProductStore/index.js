import React, { Fragment, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getProductPage, getProductBySlug } from "../../../actions";
import "./style.css";
import { generatePublicUrl } from "../../../urlConfig";
import { Link } from "react-router-dom";
import Card from "../../../components/UI/Card";

/**
* @author
* @function ProductStore

**/

export const ProductStore = (props) => {
  const product = useSelector((state) => state.product);
  const [priceRange, setPriceRange] = useState({
    under5m: 5000000,
    under10m: 10000000,
    under15m: 15000000,
    under20m: 20000000,
    under30m: 30000000,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;
    console.log(match);
    dispatch(getProductBySlug(match.params.slug));
  }, []);

  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <Card
            headerLeft={` ${props.match.params.slug} mobile under ${priceRange[key]}`}
            headerRight={<button>view all</button>}
            style={{ width: "calc(100%-40px)", margin: "20px" }}
          >
            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((product) => {
                return (
                  <Link
                    to={`${product.slug}/${product._id}/p`}
                    style={{ display: "block" }}
                    className='productContainer'
                  >
                    <div className='productImgContainer'>
                      <img
                        src={generatePublicUrl(product.productPictures[0].img)}
                        alt=''
                      />
                    </div>
                    <div className='productInfo'>
                      <div style={{ margin: "5px" }}>{product.name}</div>
                      <div>
                        <span>4.3</span>&nbsp;
                        <span>3353</span>
                      </div>
                      <div className='productPrice'>{product.price}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Card>
        );
      })}
    </>
  );
};
