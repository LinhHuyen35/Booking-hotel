import { CloseIcon } from '@chakra-ui/icons';
import axios from 'axios';
import LayoutPrimary from 'layouts/LayoutPrimary';
import React, { useEffect, useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../../module/modal/Modal.module.css';

import classNames from 'classnames/bind';
import ConfirmModal from 'module/modal/confirmModal';
const cx = classNames.bind(styles);
const AddRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [rooms, setRooms] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const deleteRoom = async (hotelId) => {
    await axios.delete(`https://103.184.113.181:449/room/${hotelId}`);
    const newRoom = rooms.filter((item) => item.id !== hotelId);
    setRooms(newRoom);
  };

  const handleAddRoom = () => {
    navigate('/AddRoomForm', {
      state: { id: location.state.id, update: 'notUpdate' },
    });
  };
  const handleUpdateRoom = (room) => {
    navigate('/AddRoomForm', {
      state: { id: location.state.id, roomData: room, update: 'update' },
    });
  };
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_HTTSPURL}:${process.env.REACT_APP_ROOM}/hotel/${location.state.id}/rooms?page=1&limit=10`
      )
      .then(function (response) {
        console.log(response);
        setRooms(response.data.items);
      });
  }, [location.state.id]);
  return (
    <LayoutPrimary host>
      <div className="p-24 ">
        <div>
          <h1 className="mb-6 text-4xl font-bold">List of Properties</h1>
          <div className="flex items-center justify-between w-full">
            <p className="text-2xl opacity-70 text-[#787885]">
              Add Some Properties of your place
            </p>
            <i onClick={handleAddRoom} className="cursor-pointer">
              <svg
                width="24"
                height="24"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M33.4286 14.1429H21.8571V2.57143C21.8571 1.15152 20.7056 0 19.2857 0H16.7143C15.2944 0 14.1429 1.15152 14.1429 2.57143V14.1429H2.57143C1.15152 14.1429 0 15.2944 0 16.7143V19.2857C0 20.7056 1.15152 21.8571 2.57143 21.8571H14.1429V33.4286C14.1429 34.8485 15.2944 36 16.7143 36H19.2857C20.7056 36 21.8571 34.8485 21.8571 33.4286V21.8571H33.4286C34.8485 21.8571 36 20.7056 36 19.2857V16.7143C36 15.2944 34.8485 14.1429 33.4286 14.1429Z"
                  fill="#9A9A9A"
                />
              </svg>
            </i>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-16 mt-20 ">
          {rooms
            ? rooms.length > 0 &&
              rooms.map((room) => (
                <div
                  key={room.id}
                  className="flex items-center px-6 py-6 rounded bg-[#EFF0F2]"
                >
                  {showConfirmation && (
                    <ConfirmModal
                      hiddenFunction={() => {
                        deleteRoom(room.id);
                      }}
                      setShowConfirmation={setShowConfirmation}
                      message="Are You Sure"
                    />
                  )}
                  <div className="flex flex-col flex-1">
                    <h2 className="text-xl font-bold">{room.name}</h2>
                    <p className="font-medium opacity-75 text-medium">
                      {room.type}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <i
                      className="text-2xl cursor-pointer"
                      onClick={() => {
                        handleUpdateRoom(room);
                      }}
                    >
                      <BiEdit />
                    </i>
                    <div
                      className="text-sm cursor-pointer hover:opacity-70"
                      onClick={() => {
                        setShowConfirmation(true);
                      }}
                    >
                      <CloseIcon
                        customclass={cx('close-image-modal')}
                      ></CloseIcon>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </LayoutPrimary>
  );
};

export default AddRoom;
