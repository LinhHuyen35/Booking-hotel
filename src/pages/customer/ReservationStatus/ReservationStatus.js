import React, { useEffect, useState } from 'react';
import styles from './ReservationStatus.module.css';
import HistoryItem from '../../../components/HistoryItem/HistoryItem';
import classNames from 'classnames/bind';
import LayoutPrimary from 'layouts/LayoutPrimary';

import {
  addSearchPastData,
  addSearchData,
  fetchHistoryBooking,
  getApprovedHistory,
  getPastData,
  getSearch,
  getAllHistory,
  getCustomerPast,
} from 'features/booked/historyBookingSlice';
import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles); //Doi de k trung css

function ReservationStatus() {
  const dispatch = useDispatch();
  // const data=userSelector((state) => state.userSlice);
  const pastData = useSelector(getPastData);
  const data = useSelector(getCustomerPast);
  const searchData = useSelector(getSearch);
  const approved = useSelector(getApprovedHistory);
  const user = (() => {
    const storageRoomsData = JSON.parse(localStorage.getItem('userData'));
    return storageRoomsData ?? [];
  })();
  const [tab, setTab] = useState(true);
  const [query, setQuery] = useState('');

  const handleChangeSearchInput = (e) => {
    setQuery(e.target.value);
    handleSearch(e.target.value);
  };

  const handleSearch = (x) => {
    if (tab === true) {
      if (x.length === 0) {
        dispatch(addSearchData(approved));
      } else {
        let newHis = searchData.filter((item) => {
          return (
            item.hotel.name.toUpperCase().indexOf(x.toUpperCase()) !== -1 ||
            item.hotel.name
              .toUpperCase()
              .indexOf(x.split('').join(' ').toUpperCase()) !== -1
          );
        });
        dispatch(addSearchData(newHis));
      }
    } else {
      if (x.length === 0) {
        dispatch(addSearchPastData(data));
      } else {
        let newHis = pastData.filter((item) => {
          return (
            item.hotel.name.toUpperCase().indexOf(x.toUpperCase()) !== -1 ||
            item.hotel.name
              .toUpperCase()
              .indexOf(x.split('').join(' ').toUpperCase()) !== -1
          );
        });
        dispatch(addSearchPastData(newHis));
      }
    }
  };

  const handleSetTab = () => {
    setTab(!tab);
  };
  const tabActive = cx('tab-active');

  useEffect(() => {
    dispatch(fetchHistoryBooking({ userId: user.id }));
  }, [user.id, dispatch, tab]);

  return (
    <LayoutPrimary>
      <div className={cx('reservation-container')}>
        <h2 className={cx('top-title')}>Reservation</h2>
        <div className={cx('history')}>
          <div className={cx('history-wrapper')}>
            <div
              className={cx('history-title', tab && tabActive)}
              onClick={handleSetTab}
            >
              Upcoming
            </div>
            <div
              className={cx('history-title', !tab && tabActive)}
              onClick={handleSetTab}
            >
              Past
            </div>
          </div>
          <div className={cx('search-wrapper')}>
            <i className={cx('search-icon-container')}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_682_201)">
                  <path
                    d="M11.7419 10.3441C12.7102 9.02279 13.1439 7.38459 12.9562 5.75725C12.7685 4.12991 11.9733 2.63344 10.7297 1.56723C9.48604 0.501022 7.88567 -0.0562959 6.24876 0.00677721C4.61184 0.0698504 3.05911 0.748663 1.90119 1.90741C0.743273 3.06615 0.0655718 4.61938 0.00366997 6.25633C-0.0582319 7.89329 0.500231 9.49326 1.56733 10.7361C2.63443 11.979 4.13147 12.7732 5.75894 12.9597C7.38641 13.1462 9.0243 12.7113 10.3449 11.7421H10.3439C10.3739 11.7821 10.4059 11.8201 10.4419 11.8571L14.2919 15.7071C14.4794 15.8947 14.7338 16.0002 14.9991 16.0003C15.2643 16.0004 15.5188 15.8951 15.7064 15.7076C15.8941 15.5201 15.9995 15.2657 15.9996 15.0005C15.9997 14.7352 15.8944 14.4807 15.7069 14.2931L11.8569 10.4431C11.8212 10.4069 11.7827 10.3735 11.7419 10.3431V10.3441ZM11.9999 6.5001C11.9999 7.22237 11.8577 7.93757 11.5813 8.60486C11.3049 9.27215 10.8997 9.87847 10.389 10.3892C9.87829 10.8999 9.27197 11.305 8.60468 11.5814C7.93739 11.8578 7.22219 12.0001 6.49992 12.0001C5.77765 12.0001 5.06245 11.8578 4.39516 11.5814C3.72787 11.305 3.12156 10.8999 2.61083 10.3892C2.10011 9.87847 1.69498 9.27215 1.41858 8.60486C1.14218 7.93757 0.999921 7.22237 0.999921 6.5001C0.999921 5.04141 1.57938 3.64246 2.61083 2.61101C3.64228 1.57956 5.04123 1.0001 6.49992 1.0001C7.95861 1.0001 9.35756 1.57956 10.389 2.61101C11.4205 3.64246 11.9999 5.04141 11.9999 6.5001Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_682_201">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </i>
            <input
              className={cx('search')}
              placeholder="Search"
              value={query}
              onChange={handleChangeSearchInput}
            />
          </div>
        </div>
        {tab ? (
          <div className={cx('status')}>
            {searchData?.length > 0 &&
              searchData.map((item) => (
                <HistoryItem
                  key={item.id}
                  item={item}
                  userId={user.id}
                  userName={user.user.name}
                />
              ))}
          </div>
        ) : (
          <div className={cx('status')}>
            {pastData?.length > 0 &&
              pastData.map((item) => (
                <HistoryItem
                  past
                  key={item.id}
                  item={item}
                  userId={user.id}
                  userName={user.user.name}
                />
              ))}
          </div>
        )}
      </div>
    </LayoutPrimary>
  );
}

export default ReservationStatus;
