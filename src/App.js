import "./App.css";
import HomePage from "./containers/HomePage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductlistPage from "./containers/ProductlistPage";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions";
import { useEffect } from "react";
import ProductDetailsPage from "./containers/ProductDetailsPage";
import CartPage from "./containers/CartPage";
import CheckoutPage from "./containers/CheckoutPage";
import OrderPage from "./containers/OrderPage";
import { updateCart } from "./actions/cart.action";
import OrderDetailsPage from "./containers/OrderPage/OrderDetailsPage";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    dispatch(updateCart());
  }, [auth.authenticate]);
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/' exact component={HomePage} />
          <Route path='/cart' component={CartPage} />
          <Route path='/checkout' component={CheckoutPage} />
          <Route path='/account/orders' component={OrderPage} />
          <Route path='/order_details/:orderId' component={OrderDetailsPage} />
          <Route
            path='/:productSlug/:productId/p'
            component={ProductDetailsPage}
          />
          <Route path='/:slug' component={ProductlistPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
