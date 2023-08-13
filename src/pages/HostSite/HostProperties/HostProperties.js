import styles from './HostProperties.module.css';
import React, { useEffect, useState } from 'react';
import LayoutPrimary from 'layouts/LayoutPrimary';
import classNames from 'classnames/bind';
import Card from '../../../components/Card/Card';
import Button from '../../../components/Button/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ConfirmModal from 'module/modal/confirmModal';
const cx = classNames.bind(styles);
function HostProperties() {
  const customer = (() => {
    const storageRoomsData = JSON.parse(localStorage.getItem('userData'));

    return storageRoomsData ?? [];
  })();
  const [totalHotels, setTotelHostels] = useState();

  const [listHotels, setListHotels] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const deleteHotel = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_HTTSPURL}:${process.env.REACT_APP_HOTEL}/hotel/${id}`
      );
      const newListHotel = listHotels.filter((hotel) => hotel.id !== id);
      alert('succesfully deleted');
      setListHotels(newListHotel);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  };

  const fetchDataHotel = async (page) => {
    const res = await axios.get(
      `${process.env.REACT_APP_HTTSPURL}:${process.env.REACT_APP_HOTEL}/customer/${customer.id}/hotels?page=${page}&limit=6`
    );
    setTotelHostels(res.data.total_count);
    return res.data.items;
  };

  const handleLoadMore = () => {
    fetchDataHotel(pageNumber).then((hotel) => {
      const newHotel = [...listHotels, ...hotel];
      setListHotels(newHotel);
      setPageNumber(pageNumber + 1);
    });
  };

  useEffect(() => {
    handleLoadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <LayoutPrimary host>
      <div className={cx('top-properties')}>
        <div className={cx('top-container')}>
          <h2 className="text-3xl font-bold">Listed Properties</h2>
          <Link to="/addproperties">
            <Button blue small>
              Add New
            </Button>
          </Link>
        </div>
        <div className={cx('properties-container')}>
          {listHotels
            ? listHotels.map((x) => (
                <Card
                  x={x}
                  key={x.id}
                  id={x.id}
                  desc={x.name}
                  thumbnail={x.list_image[0].url}
                  wishlists
                  host
                  deleteHotel={deleteHotel}
                >
                  {x.name}
                </Card>
              ))
            : null}
        </div>
        <div className="text-end">
          {listHotels.length !== totalHotels && (
            <button
              className="px-4 py-2 text-white rounded bg-blue"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </LayoutPrimary>
  );
}

export default HostProperties;
