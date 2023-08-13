import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Button.module.css";

const cx = classNames.bind(styles);

function Button({
  to,
  href,
  children,
  pending = false,
  small = false,
  medium = false,
  mediumx = false,
  large = false,
  primary = false,
  secondary = false,
  black = false,
  red = false,
  green = false,
  yeallow = false,
  blue = false,
  third = false,
  fourth = false,
  rounded = false,
  transparent = false,
  textRed = false,
  outline = false,
  textBlack = false,
  textBlue = false,
  bgGray = false,
  orange = false,
  backGroundWhite = false,
  leftIcon,
  rightIcon,
  className,
  ...props
}) {
  let Comp = "button";

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = "a";
  }

  const classes = cx("wrapper", {
    small,
    medium,
    mediumx,
    large,
    primary,
    secondary,
    black,
    red,
    yeallow,
    green,
    blue,
    orange,
    third,
    fourth,
    rounded,
    transparent,
    outline,
    textBlack,
    textBlue,
    backGroundWhite,
    bgGray,
    textRed,
    pending,
    [className]: className,
  });

  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={cx("icon")}>{leftIcon}</span>}
      <span className={cx("title")}>{children}</span>
      {rightIcon && <span className={cx("icon")}>{rightIcon}</span>}
    </Comp>
  );
}

export default Button;
