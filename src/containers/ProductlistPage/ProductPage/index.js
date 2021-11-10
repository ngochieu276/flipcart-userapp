import React, { Fragment, useEffect } from "react";
import { getProductPage } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import getParams from "../../../utils/getParams";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Card from "../../../components/UI/Card";
import { Carousel } from "react-responsive-carousel";

/**
 * @author
 * @function ProductPage
 **/

export const ProductPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { page } = product;

  useEffect(() => {
    const params = getParams(props.location.search);
    const payload = {
      params,
    };
    dispatch(getProductPage(payload));
  }, []);

  return (
    <div style={{ margin: "0 10px" }}>
      <h3>{page.title}</h3>
      <Carousel renderThumbs={() => {}}>
        {page.banners &&
          page.banners.map((banner, index) => (
            <a
              key={index}
              style={{ display: "block" }}
              href={banner.navigateTo}
            >
              <img src={banner.img} alt='' />
            </a>
          ))}
      </Carousel>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {page.products &&
          page.products.map((product, index) => (
            <Card
              style={{
                width: "400px",
                height: "200px",
                margin: "0 5px",
                margin: "10px 0",
              }}
              card={product}
              key={index}
            >
              <img
                style={{ width: "100%", height: "100" }}
                src={product.img}
                alt=''
              />
            </Card>
          ))}
      </div>
    </div>
  );
};
