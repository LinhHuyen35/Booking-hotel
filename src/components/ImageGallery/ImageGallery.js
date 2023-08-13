import classNames from "classnames/bind";
import styles from "./ImageGallery.module.css";

const cx = classNames.bind(styles);

function ImageGallery({ list_image }) {
  const newArr = list_image?.slice(0, 5);
  return (
    <div className={cx("gallery")}>
      {newArr?.map((image) => (
        <div key={image.id} className={cx("image-gallery")}>
          <img src={image.url} className={cx("image")} alt="noImage" />
        </div>
      ))}
    </div>
  );
}

export default ImageGallery;
