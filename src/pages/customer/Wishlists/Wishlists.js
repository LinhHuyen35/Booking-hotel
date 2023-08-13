import styles from "./Wishlists.module.css";
import React from "react";
import LayoutPrimary from "layouts/LayoutPrimary";
import classNames from "classnames/bind";
import Card from "../../../components/Card/Card";
import Button from "../../../components/Button/Button";

const cx = classNames.bind(styles);
function Wishlists({ wishlist, handleRemove, clearAll }) {
  return (
    <LayoutPrimary>
      <div className={cx("top-wishlists")}>
        <div className={cx("top-container")}>
          <h2>Wishlists</h2>
          <Button red onClick={clearAll} small>
            Clear All
          </Button>
        </div>
        <div className={cx("wishlists-container")}>
          <Card add wishlists />

          {wishlist?.length > 0 &&
            wishlist?.map((list) => (
              <Card
                key={list.id}
                wishlists
                desc={list.address.province}
                onClick={() => handleRemove(list.id)}
                thumbnail={list.list_image[0].url}
              >
                {list.name}
              </Card>
            ))}
        </div>
      </div>
    </LayoutPrimary>
  );
}

export default Wishlists;
