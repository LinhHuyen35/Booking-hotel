import Footer from "components/footer/footer";
import NavBar from "components/nav/nav";
import React from "react";

const LayoutPrimary = (props) => {
  const { host = false, children } = props;
  return (
    <div style={{ position: "relative" }}>
      <NavBar host={host}></NavBar>
      {children}
      <Footer></Footer>
    </div>
  );
};

// backgroundColor: "rgba(0, 0, 0, .5)";

export default LayoutPrimary;
