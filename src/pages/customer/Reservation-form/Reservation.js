import styles from "./Reservation.module.css";
import ReservationPaymentMethod from "../../../components/ReservationPaymentMethod/ReservationPaymentMethod";
import ReservationFormFirst from "../../../components/ReservationFormFirst/ReservationFormFirst";
import React, { useState } from "react";
import LayoutPrimary from "layouts/LayoutPrimary";
import classNames from "classnames/bind";
import Button from "../../../components/Button/Button";

const cx = classNames.bind(styles);
function ReservationForm() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [checkBill, setCheckBill] = useState(true);

  return (
    <LayoutPrimary>
      <div className={cx("reservation-container")}>
        <div className={cx("col-left")}>
          <h1 className={cx("h1")}>
            Reservation <br /> Form Details
          </h1>
          <Button medium black rounded>
            Go To Home
          </Button>
        </div>
        <div className={cx("col-right")}>
          {checkBill ? (
            <ReservationFormFirst
              userData={userData}
              handleSetCheckBill={() => {
                setCheckBill(!checkBill);
              }}
            />
          ) : (
            <ReservationPaymentMethod
              userData={userData}
              handleSetCheckBill={() => {
                setCheckBill(!checkBill);
              }}
            />
          )}
        </div>
      </div>
    </LayoutPrimary>
  );
}

export default ReservationForm;
