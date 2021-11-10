import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions";
import { generatePublicUrl } from "../../urlConfig";
import "./style.css";
import { Breed } from "../../components/MaterialUI";
import { IoIosArrowForward } from "react-icons/io";
/**
 * @author
 * @function OrderPage
 **/

const OrderPage = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, []);
  return (
    <Layout>
      <div style={{ maxWidth: "1160px", margin: "5px auto" }}>
        <Breed
          breed={[
            { name: "Home", href: "/" },
            { name: "My Acount", href: "/account" },
            { name: "My Orders", href: "/account/orders" },
          ]}
          breedIcon={<IoIosArrowForward />}
        />
        {user.orders.map((order) => {
          return order.items.map((item) => {
            return (
              <Card style={{ maxWidth: "1200px", margin: "5px auto" }}>
                <Link to={`/order_details/${order._id}`}>
                  <div className='orderItemContainer'>
                    <div className='orderImgContainer'>
                      <img
                        className='orderImg'
                        src={generatePublicUrl(
                          item.productId.productPictures[0].img
                        )}
                      />
                    </div>
                    <div className='orderName'>{item.productId.name}</div>
                    <div className='orderPrice'>{item.payablePrice} vnd</div>
                    <div>{order.paymentStatus}</div>
                  </div>
                </Link>
              </Card>
            );
          });
        })}
      </div>
    </Layout>
  );
};

export default OrderPage;
