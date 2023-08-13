import React, { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { BsSearch } from 'react-icons/bs';
import classNames from 'classnames/bind';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Search-bar.module.css';
import { Portal } from 'react-overlays';
import axios from 'axios';
import SearchItems from 'components/SearchItems/SearchItems';
import provinceData from '../../json/province.json';
import useComponentVisible from 'Hooks/useClickOutside';
const CalendarContainer = ({ children }) => {
  const el = document.getElementById('calendar-portal');

  return <Portal container={el}>{children}</Portal>;
};

const cx = classNames.bind(styles);

const SearchField = ({
  data,
  setData,
  setTotal,
  setPageNumber,
  star,
  param,
  setParam = () => {},
}) => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [query, setQuery] = useState('');
  const [queryName, setQueryName] = useState('');
  // const [param, setParam] = useState({
  //   star_level: star,
  //   name: "",
  //   startDate: formatDate(startDate),
  //   endDate: formatDate(endDate),
  // });

  const handleNameinput = (e) => {
    setQueryName(e.target.value);
  };

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date) {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':') +
      '.' +
      ['000', '00'].join(' +')
    );
  }

  const handleClick = (item) => {
    setParam({ ...param, name: item });
    setIsComponentVisible(false);
    setQuery(item);
  };
  const handleClickStartDate = (date) => {
    setStartDate(date);
    setParam({ ...param, startDate: formatDate(date) });
  };

  const handleClickEndDate = (date) => {
    setEndDate(date);
    setParam({ ...param, endDate: formatDate(date) });
  };
  let arr = provinceData.data;
  const filteredArray = [];
  arr.map((x) => {
    if (x.name) {
      filteredArray.push(x.name);
    }
    return filteredArray;
  });

  let locationSearch = filteredArray.filter((x) => {
    return (
      x.toUpperCase().indexOf(query.toUpperCase()) !== -1 ||
      x.toUpperCase().indexOf(query.split('').join(' ').toUpperCase()) !== -1
    );
  });

  const fetchData = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_HTTSPURL}:${
        process.env.REACT_APP_HOTEL
      }/hotels?page=1&limit=4&location=${param.name}&check_in=${
        param.startDate
      }&check_out=${param.endDate}&name=${queryName}&star_level=${
        star ? star : ''
      }`
    );
    console.log(response);
    setData(response.data.items);
    setTotal(response.data.total_count);
  };

  const handleSearch = () => {
    if (data?.length > 0) {
      console.log('success search');
      fetchData();
      setPageNumber(1);
    } else if (!data) {
      console.log('success search');
      if (location.pathname !== '/Search') {
        navigate('/Search', { state: { item: param, hotelName: queryName } });
        setPageNumber(1);
      } else if (location.pathname === '/Search') {
        fetchData();
      }
    }
  };

  useEffect(() => {
    setParam({
      star_level: '',
      name: '',
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    });
  }, []);

  return (
    <div className={cx('fragment')}>
      <div className={cx('search-field')}>
        <div className={cx('item-container')}>
          <div className={cx('search-item')}>
            <span className={cx('search-title')}>Location</span>
            <input
              className={cx('search-action')}
              onClick={() => {
                setIsComponentVisible(true);
              }}
              value={query}
              placeholder="Which city do you prefer?"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className={cx('search-item')}>
            <span className={cx('search-title')}>Check In</span>
            <span className={cx('search-action')}>
              <DatePicker
                popperClassName={cx('customDatepicker')}
                portalId="root-portal"
                selected={startDate}
                onChange={(date) => handleClickStartDate(date)}
                popperContainer={CalendarContainer}
              />
            </span>
          </div>
          <div className={cx('search-item')}>
            <span className={cx('search-title')}>Check Out</span>
            <span className={cx('search-action')}>
              <DatePicker
                portalId="root-portal"
                popperClassName={cx('customDatepicker')}
                selected={endDate}
                onChange={(date) => handleClickEndDate(date)}
                popperContainer={CalendarContainer}
              />
            </span>
          </div>
          <div className={cx('search-item')}>
            <span className={cx('search-title')}>Name</span>

            <input
              className={cx('search-action')}
              value={queryName}
              onChange={handleNameinput}
              placeholder="Hotel Name"
            />
          </div>
        </div>

        <div
          className={cx('search-icon__container')}
          onClick={() => {
            handleSearch(param);
          }}
        >
          <IconContext.Provider value={{ color: '#fff', size: '20px' }}>
            <i className={cx('.search-icon')}>
              <BsSearch />
            </i>
          </IconContext.Provider>
        </div>
      </div>
      {isComponentVisible && query.length > 0 && (
        <div className={cx('search-results')} ref={ref}>
          {locationSearch.length > 0 &&
            query.length > 0 &&
            locationSearch.map((item, index) => (
              <div key={index} className={cx('search-item-wrapper')}>
                <SearchItems
                  item={item}
                  onClick={() => {
                    handleClick(item);
                  }}
                ></SearchItems>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SearchField;
