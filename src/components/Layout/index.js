import React, { Fragment } from "react";
import Header from "../Header";
import { MenuHeader } from "../MenuHeader";

/**
 * @author
 * @function Layout
 **/

const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      <MenuHeader />
      {props.children}
    </Fragment>
  );
};

export default Layout;
