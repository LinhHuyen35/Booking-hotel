import React, { useEffect, useState } from "react";
import styles from "./Admin.module.css";
import "@fontsource/mulish"; // Import font
import classNames from "classnames/bind";
import {
  AiOutlineSearch,
  AiOutlineFilter,
  AiOutlineBell,
} from "react-icons/ai";
import { BsSortUp, BsSortDownAlt } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchHostComments,
  fetchHostHotel,
  getAllComments,
  getAllHotel,
} from "features/hostHotelSlice";

const cx = classNames.bind(styles);

const ButtonAdmin = (comment) => {
  if (comment?.comment?.classify?.emotion === "1")
    return (
      <button className="px-3 py-1 min-w-[83px] text-white rounded-2xl bg-lightGreen">
        Positive
      </button>
    );
  return (
    <button className="px-3 py-1 min-w-[83px] text-white rounded-2xl bg-red">
      Negative
    </button>
  );
};

const DetailClassify = (comment) => {
  const x = comment.comment.classify
    ? Object.entries(comment?.comment?.classify)
    : [];
  const isPositive = comment.comment.classify?.emotion === "1";
  const positiveArr = [];
  const negativeArr = [];
  x.forEach(([keys, value]) => {
    if (
      isPositive === true &&
      value === "1" &&
      keys !== "emotion" &&
      keys !== "id"
    ) {
      positiveArr.push(keys);
    } else if (
      isPositive === false &&
      value === "1" &&
      keys !== "emotion" &&
      keys !== "id"
    ) {
      negativeArr.push(keys);
    }
  });
  if (comment?.comment?.classify?.emotion === "1") {
    return (
      <div className="flex flex-col gap-1">
        {isPositive === true && positiveArr?.length > 0
          ? positiveArr.map((item) => (
              <button className="px-3 py-1 min-w-[83px] text-white rounded-2xl truncate bg-lightGreen">
                {item}
              </button>
            ))
          : "N/A"}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {isPositive === false && negativeArr.length > 0
        ? negativeArr.map((item) => (
            <button className="px-3 py-1 min-w-[83px] text-white truncate rounded-2xl bg-red">
              {item}
            </button>
          ))
        : "N/A"}
    </div>
  );
};

const BodyTable = ({ status }) => {
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-full">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 mr-2 text-lightGray animate-spin dark:text-lightGray fill-blue"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
};

function Admin() {
  const [isActive, setIsActive] = useState(0);
  const user = (() => {
    const storageRoomsData = JSON.parse(localStorage.getItem("userData"));
    return storageRoomsData ?? [];
  })();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.hostHotel.status);
  const hotelData = useSelector(getAllHotel);
  const comments = useSelector(getAllComments);
  const handleClick = (item, index) => {
    setIsActive(index);
    dispatch(fetchHostComments({ hotelId: item.id }));
  };

  useEffect(() => {
    dispatch(fetchHostHotel({ userId: user.id })).then((x) => {
      dispatch(fetchHostComments({ hotelId: x.payload[0].id }));
    });
  }, [dispatch, user.id]);
  return (
    <div className={cx("wrapper")}>
      <aside className={cx("aside")}>
        <h2 className={cx("h2")}>Hotel Name</h2>
        <div className="overflow-auto h-[594px] cursor-pointer">
          {hotelData.map((item, index) => (
            <div
              key={item.id}
              className={
                isActive !== index
                  ? cx("tab_bar")
                  : "bg-[#2e3c8f] py-[25px] px-[16px]"
              }
              onClick={() => {
                handleClick(item, index);
              }}
            >
              {console.log(isActive !== item.id)}
              {item.name}
            </div>
          ))}
        </div>
      </aside>
      <main className={cx("table_admin")}>
        <nav>
          <h1 className={cx("h1")}> Management Booking Comments </h1>
          <div className={cx("nav_right")}>
            <div className={cx("noti_icon")}>
              <AiOutlineBell></AiOutlineBell>
            </div>
            <div> {user.user.name}</div>
            <img
              className="w-10 h-10 rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxF9EkJbKO9E8COZZwzRobDFe0N8lCwDyFXWo-CkTsRQ&s"
              alt="no img"
            />
          </div>
        </nav>
        <div className={cx("table-container")}>
          <table>
            <caption>
              <div className={cx("sub_nav")}>
                <h3 className={cx("h3")}> Details </h3>
                <div className={cx("nav_icon")}>
                  <input
                    className={cx("input")}
                    type="text"
                    placeholder=" Input text"
                  ></input>
                  <AiOutlineSearch className={cx("icon")}></AiOutlineSearch>
                  <AiOutlineFilter className={cx("icon")}></AiOutlineFilter>
                  <BsSortUp className={cx("icon")}></BsSortUp>
                  <BsSortDownAlt className={cx("icon")}></BsSortDownAlt>
                </div>
              </div>
            </caption>
            <thead>
              <tr>
                <th> ID </th>
                <th> Content </th>
                <th> Customer Name </th>
                <th> Date </th>
                <th> Rate </th>
                <th> Classify </th>
                <th> Detail </th>
              </tr>
            </thead>
            <tbody className="block h-[454px] w-full overflow-auto">
              {status === "loading" ? (
                <BodyTable status={status} />
              ) : (
                comments?.map((comment) => (
                  <tr key={comment.id} className={cx("customer")}>
                    <td>{comment.id}</td>
                    <td>
                      <p>{comment.text}</p>
                    </td>
                    <td>
                      <p>{comment.customer_name}</p>
                    </td>
                    <td>
                      <p>{comment.comment_date}</p>
                    </td>
                    <td>
                      <p>{comment.rate}</p>
                    </td>
                    <td>
                      <ButtonAdmin comment={comment} />
                    </td>
                    <td>
                      <DetailClassify comment={comment} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Admin;
