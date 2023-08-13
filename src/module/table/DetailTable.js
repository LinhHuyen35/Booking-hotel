import React, { useEffect, useState } from 'react';
import styles from '../../module/table/table.module.css';
import classNames from 'classnames/bind';
import Button from 'components/Button/Button';
import { BiBuilding } from 'react-icons/bi';
import { AiOutlinePhone } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const cx = classNames.bind(styles);

const DetailTable = ({
  reserve = false,
  title = '',
  detailsHotel = [],
  id,
}) => {
  const isLogin = JSON.parse(localStorage.getItem('userData'));
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const reserveStorage = () => {
    if (isLogin) {
      navigate('/ReservationForm', { state: { hotelData: detailsHotel } });
    } else if (!isLogin) {
      alert('Please login first');
    }
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_HTTSPURL}:${process.env.REACT_APP_ROOM}/hotel/${id}/rooms?page=1&limit=10`
      )
      .then(function (response) {
        console.log(response);
        setRooms(response.data.items);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [id]);
  const singleRoom = rooms.filter((room) => room.type === 'Single');
  const doubleRoom = rooms.filter((room) => room.type === 'Double');
  const vipRoom = rooms.filter((room) => room.type === 'VIP');
  console.log(singleRoom);
  return (
    <div className={cx('side-bar')}>
      <div className={cx('price-range')}>{title}</div>
      <div className={cx('price-container')}>
        <table className={cx('table')}>
          <tbody>
            <tr>
              <td>Single:</td>
              {singleRoom.length !== 0 ? (
                <td key={singleRoom[0].id}>{singleRoom[0].price}</td>
              ) : (
                <td>Not avaible</td>
              )}
            </tr>
            <tr>
              <td>Double:</td>
              {doubleRoom.length !== 0 ? (
                <td key={doubleRoom[0].id}>{doubleRoom[0].price}</td>
              ) : (
                <td>Not avaible</td>
              )}
            </tr>
            <tr>
              <td>VIP:</td>
              {vipRoom.length !== 0 ? (
                <td key={vipRoom[0].id}>{vipRoom[0].price}</td>
              ) : (
                <td>Not avaible</td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
      {reserve && (
        <Button large black rounded onClick={reserveStorage}>
          Reserve Now
        </Button>
      )}
      <div className={cx('contact')}>
        <div className={cx('contact-information')}>
          <div className={cx('contact-name')}>Property Inquiry</div>
          <i className={cx('contact-icon')}>
            <BiBuilding />
          </i>
        </div>
        <div className={cx('contact-information')}>
          <div className={cx('contact-name')}>Contact Host</div>
          <i className={cx('contact-icon')}>
            <AiOutlinePhone />
          </i>
        </div>
      </div>
    </div>
  );
};

export default DetailTable;
