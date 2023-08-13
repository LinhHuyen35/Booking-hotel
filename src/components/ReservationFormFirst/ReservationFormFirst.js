import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ReservationFormFirst.module.css';
import ReservationItem from '../ReservationItem/ReservationItem';
import { AiOutlineCalendar } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '../Button/Button';
import { IconContext } from 'react-icons/lib';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { differenceInDays } from 'date-fns';
import ConfirmModal from 'module/modal/confirmModal';
const cx = classNames.bind(styles);

function ReservationFormFirst({ handleSetCheckBill, userData }) {
  const [bookedData, setBookedData] = useState({
    start_date: '',
    end_date: '',
    customer_id: userData.id,
    bookedroom: [],
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [totalPrices, setTotalPrices] = useState();
  const [rooms, setRooms] = useState([]);
  const [cart, setCart] = useState([]);
  const [showRoomStyle, setShowRoomStyle] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalDay, setTotalDay] = useState(0);
  const [fee, setFee] = useState(0);
  const [totalFee, setTotalFee] = useState(0);
  const location = useLocation();
  const data = location.state.hotelData;
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_HTTSPURL}:${process.env.REACT_APP_ROOM}/hotel/${data.id}/rooms?page=1&limit=10`
      )
      .then(function (response) {
        setRooms(response.data.items);
      })
      .catch(function (error) {
        console.log(error);
      });
    setTotalPrices(
      cart
        .map((cartItem) => {
          return cartItem.totalPrice;
        })
        .reduce((acc, cur) => acc + cur, 0)
    );
    setTotalDay(differenceInDays(endDate, startDate) + 1);
    setFee(totalDay * totalPrices);
    setTotalFee(fee * 0.1 + fee);
  }, [data.id, cart, endDate, startDate, totalDay, totalPrices, totalFee, fee]);

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
      ['00', '00', '00'].join(':') +
      '.' +
      ['000', '00'].join(' +')
    );
  }

  const removeItem = (type) => {
    const newItems = cart.filter((item) => item.type !== type.type);
    const newBookedRoom = bookedData.bookedroom.filter(
      (ite) => ite.room_id !== type.id
    );
    setBookedData({ ...bookedData, bookedroom: newBookedRoom });
    setCart(newItems);
  };

  const addItem = () => {
    if (formatDate(endDate) === formatDate(startDate)) {
      return alert('Dates are not duplicated');
    }
    if (differenceInDays(endDate, startDate) + 1 === 0) {
      return alert('Checkout date must be after checkin date ');
    }
    setShowRoomStyle(!showRoomStyle);
  };

  const addRoom = (type) => {
    if (formatDate(endDate) === formatDate(startDate)) {
      return alert('Dates are not duplicated');
    }
    if (differenceInDays(endDate, startDate) + 1 === 0) {
      return alert('Checkout date must be after checkin date ');
    }
    const newRoom = rooms.filter((room) => room.type === type);
    const { price, id } = newRoom[0];
    const roomData = {
      check_in: formatDate(startDate),
      check_out: formatDate(endDate),
      price: price,
      room_id: id,
      quantity: 1,
    };
    setCart([
      ...cart,
      { ...newRoom[0], quantity: 1, totalPrice: newRoom[0].price },
    ]);

    setBookedData({
      ...bookedData,
      bookedroom: [...bookedData.bookedroom, roomData],
    });
  };

  const handleIncrease = (item) => {
    const roomData = {
      check_in: formatDate(startDate),
      check_out: formatDate(endDate),
      price: item.price,
      room_id: item.id,
      quantity: item.quantity + 1,
    };

    setCart(
      cart.map((cartItem) =>
        cartItem.type === item.type
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
              totalPrice: cartItem.price * (cartItem.quantity + 1),
            }
          : cartItem
      )
    );

    const newBookedData = bookedData.bookedroom.map((itemRoom) =>
      itemRoom.room_id === item.id ? roomData : itemRoom
    );
    setBookedData({
      ...bookedData,
      bookedroom: newBookedData,
    });
  };
  const handleDecrease = (item) => {
    if (item.quantity === 1) {
      return alert('The quantity must be at least 1');
    }

    const roomData = {
      check_in: formatDate(startDate),
      check_out: formatDate(endDate),
      price: item.price,
      room_id: item.id,
      quantity: item.quantity - 1,
    };

    setCart(
      cart.map((cartItem) =>
        cartItem.type === item.type
          ? {
              ...cartItem,
              quantity: cartItem.quantity - 1,
              totalPrice: cartItem.price * (cartItem.quantity - 1),
            }
          : cartItem
      )
    );

    const newBookedData = bookedData.bookedroom.map((itemRoom) =>
      itemRoom.room_id === item.id ? roomData : itemRoom
    );
    setBookedData({
      ...bookedData,
      bookedroom: newBookedData,
    });
  };

  const alertLackQuantityOfRoom = async (id) => {
    const res = await axios.get(`https://103.184.113.181:449/room/${id}`);
    return alert(`Not enough quantity of room ${res.data.type}`);
  };

  const handleFetchData = async () => {
    if (bookedData.bookedroom.length === 0) {
      return alert('Booking must have at least 1 room');
    }
    if (formatDate(endDate) === formatDate(startDate)) {
      return alert('Dates are not duplicated');
    }
    if (differenceInDays(endDate, startDate) + 1 <= 0) {
      return alert('Checkout date must be after checkin date ');
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_HTTSPURL}:${process.env.REACT_APP_BOOKING}/create_booking`,
        JSON.stringify({
          ...bookedData,
          start_date: formatDate(startDate),
          end_date: formatDate(endDate),
        })
      );
      cart.length > 0
        ? handleSetCheckBill()
        : alert('Vui long chon phong truoc');
      const fakeBookingData = {
        id: res.data.id,
        bookedData,
      };
      localStorage.setItem('bookingData', JSON.stringify(fakeBookingData));
    } catch (error) {
      if (error.response.data.error) {
        const err = error.response.data.error.split(' ');
        alertLackQuantityOfRoom(err[err.length - 1]);
      }
      console.log(error);
    }
  };
  return (
    <div className={cx('reservation-form-first')}>
      {showConfirmation && (
        <ConfirmModal
          hiddenFunction={handleFetchData}
          setShowConfirmation={setShowConfirmation}
          message="Confirm creating the order"
        />
      )}
      <div className={cx('reservation-top')}>
        {showRoomStyle && (
          <ul className={cx('rooms-list')}>
            {rooms.filter((room) => room.type === 'Single').length > 0 &&
              cart.filter((room) => room.type === 'Single').length === 0 && (
                <li
                  className={cx('room-list-item')}
                  onClick={() => {
                    addRoom('Single');
                  }}
                >
                  Single
                </li>
              )}
            {rooms.filter((room) => room.type === 'Double').length > 0 &&
              cart.filter((room) => room.type === 'Double').length === 0 && (
                <li
                  className={cx('room-list-item')}
                  onClick={() => {
                    addRoom('Double');
                  }}
                >
                  Double
                </li>
              )}
            {rooms.filter((room) => room.type === 'VIP').length > 0 &&
              cart.filter((room) => room.type === 'VIP').length === 0 && (
                <li
                  className={cx('room-list-item')}
                  onClick={() => {
                    addRoom('VIP');
                  }}
                >
                  VIP
                </li>
              )}
          </ul>
        )}
        <Button className={cx('add')} medium onClick={addItem}>
          Add Room
        </Button>
      </div>
      <div className={cx('reservation-item--container')}>
        {cart.length > 0 &&
          cart.map((item) => (
            <ReservationItem
              id={item.id}
              key={item.id}
              item={item}
              removeItem={removeItem}
              // calculatePrice={calculatePrice}
              handleIncrease={handleIncrease}
              handleDecrease={handleDecrease}
            />
          ))}
      </div>
      <div className={cx('bill')}>
        <div className={cx('col-3')}>
          <h2 className={cx('top-heading')}>Details</h2>
          <div className={cx('total-days')}>
            <p className={cx('total')}>Total Days: {totalDay}</p>
          </div>
        </div>
        <div className={cx('col-3')}>
          <h2 className={cx('top-heading')}>Date</h2>
          <div className={cx('date')}>
            <div className={cx('check')}>Check-in:</div>
            <label className={cx('label')}>
              <IconContext.Provider value={{ color: 'blue' }}>
                <div>
                  <AiOutlineCalendar />
                </div>
              </IconContext.Provider>
              <DatePicker
                wrapperClassName={cx('datePicker')}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </label>
          </div>
          <div className={cx('date')}>
            <div className={cx('check')}>Check-out:</div>
            <label className={cx('label')}>
              <IconContext.Provider value={{ color: 'blue' }}>
                <div>
                  <AiOutlineCalendar />
                </div>
              </IconContext.Provider>
              <DatePicker
                wrapperClassName={cx('datePicker')}
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </label>
          </div>
        </div>
        <div className={cx('col-3', 'cost')}>
          <h2 className={cx('top-heading', 'price')}>Price</h2>

          <div className={cx('fee')}>
            <p>Fee: </p>
            <p>{fee}</p>
          </div>
          <div className={cx('fee')}>
            <p>Tax: 10%</p>
          </div>
          <div className={cx('fee', 'total-price')}>
            <p>Totals fee: {totalFee}</p>
            <p></p>
          </div>
        </div>
      </div>
      <Button
        medium
        black
        onClick={() => {
          setShowConfirmation(true);
        }}
        className={cx('custom-button')}
      >
        Next
      </Button>
    </div>
  );
}

export default ReservationFormFirst;
