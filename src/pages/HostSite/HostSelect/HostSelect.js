import React from "react";
import styles from "./HostSelect.module.css";

import classNames from "classnames/bind";
import Button from "../../../components/Button/Button";

const cx = classNames.bind(styles);
function HostSelect() {
  return (
    <div className={cx("container")}>
      <Button medium blue to="/LoginHost">
        Login as A host
      </Button>
      <Button medium blue to="/SignUpHost">
        SignUp as a host
      </Button>
    </div>
  );
}

export default HostSelect;
