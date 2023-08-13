import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './HistoryItem.module.css';
import Button from '../Button/Button';
import Modal from '../../module/modal/Modal';
import { useDispatch } from 'react-redux';
import {
  completeHistoryBooking,
  deleteHistoryBooking,
} from 'features/booked/historyBookingSlice';
import BookingModal from 'module/modal/bookingModal';
import ConfirmModal from 'module/modal/confirmModal';

const cx = classNames.bind(styles);

function HistoryItem({ host = false, past = false, userId, item, userName }) {
  const dispatch = useDispatch();
  const { id, start_date, total_price, hotel } = item;
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  console.log(isOpen);

  const handleModalVisible = () => {
    setVisible(!visible);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    if (!isComplete) {
      dispatch(deleteHistoryBooking({ itemId: item.id }));
    } else if (isComplete) {
      dispatch(completeHistoryBooking({ itemId: item.id }));
    }
  };

  const handleOnclick = () => {
    setShowConfirmation(true);
    setIsComplete(true);
  };

  return (
    <div className={cx('history-item')}>
      {showConfirmation && (
        <ConfirmModal
          hiddenFunction={handleDelete}
          setShowConfirmation={setShowConfirmation}
          setIsComplete={setIsComplete}
          message="Are You Sure"
        />
      )}
      {visible && (
        <Modal
          handleModalVisible={handleModalVisible}
          userId={userId}
          hotel={hotel}
          userName={userName}
        ></Modal>
      )}

      {isOpen && <BookingModal closeModal={closeModal} item={item} />}

      <div className={cx('item-container')}>
        <div className={cx('col-left')} onClick={openModal}>
          <div className={cx('img-container')}>
            <img
              src="https://media-cdn.tripadvisor.com/media/photo-s/1c/59/4c/d3/hanoi-la-siesta-hotel.jpg"
              alt="No img"
              className={cx('image')}
            />
          </div>
          <div className={cx('item-information')}>
            <div className={cx('item-title')}>
              <span>BookingID: {id}</span>
              <span>{hotel?.name}</span>
            </div>
            <div className={cx('item-specific')}>
              <div className={cx('specific')}>
                Booked Date:{' '}
                <span className={cx('time')}>{start_date.split(' ')[0]}</span>
              </div>

              {/* <div className={cx("specific")}>
                Check out: <span className={cx("time")}>12 Mar 2021</span>
              </div> */}
            </div>
            <div className={cx('item-price')}>{total_price} $</div>
          </div>
        </div>
        <div className={cx('col-right')}>
          {host ? (
            <div className={cx('button-container')}>
              {item.status === 'approved' ? (
                <>
                  <Button
                    green
                    className={cx('button-size')}
                    onClick={handleOnclick}
                  >
                    Complete Reservation
                  </Button>
                  <Button
                    bgGray
                    className={cx('button-size')}
                    onClick={() => {
                      setShowConfirmation(true);
                    }}
                  >
                    Cancel Reservation
                  </Button>
                </>
              ) : item.status !== 'approved' ? (
                <div>
                  {item.status === 'completed' && (
                    <Button className={cx('completed')} medium>
                      Completed
                    </Button>
                  )}
                  {item.status === 'cancelled' && (
                    <Button className={cx('cancelled')} medium>
                      Cancelled
                    </Button>
                  )}
                </div>
              ) : (
                ''
              )}
            </div>
          ) : (
            <div className={cx('button-wrapper')}>
              {item.status === 'approved' && (
                <div className="flex gap-2">
                  {/* <Button medium rounded green className={cx("button-size")}>
                    Approved
                  </Button> */}
                  <Button
                    medium
                    rounded
                    bgGray
                    className={cx('button-size')}
                    onClick={() => {
                      setShowConfirmation(true);
                    }}
                  >
                    Cancel Reservation
                  </Button>
                </div>
              )}
              {item.status === 'completed' && (
                <Button className={cx('completed')} medium>
                  Completed
                </Button>
              )}
              {item.status === 'cancelled' && (
                <Button className={cx('cancelled')} medium>
                  Cancelled
                </Button>
              )}
              {past && (
                <Button
                  medium
                  className={cx('button-size', 'review')}
                  onClick={() => {
                    handleModalVisible();
                  }}
                >
                  Rate & Review
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HistoryItem;
