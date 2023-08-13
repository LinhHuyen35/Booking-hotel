import CloseIcon from 'module/Icons/CloseIcon';
import React from 'react';

const BookingModalHeader = ({ closeModal, img, item }) => {
  return (
    <div className="flex justify-between">
      <div className="relative flex gap-12">
        <span className="absolute left-[34%] h-full bg-black w-[1px] opacity-50"></span>
        <img src={img} alt="" className="w-[150px] h-full" />
        <div className="w-[300px] font-bold text-xl ">
          <div className="mb-1">Name:{item?.hotel?.name}</div>
          <div>Booking id: {item?.id}</div>
          <div>Total Price: {item?.total_price}$</div>
          <div>
            Status:{' '}
            <span
              className={`${
                item.status === 'approved' || item.status === 'completed'
                  ? 'text-lightGreen'
                  : 'text-[#a8a196]'
              } `}
            >
              {item?.status}
            </span>
          </div>
        </div>
      </div>
      <i onClick={closeModal}>
        <CloseIcon customclass="hover:bg-black hover:text-white hover:opacity-70 w-12 !h-12 cursor-pointer" />
      </i>
    </div>
  );
};

const BookedRoom = ({ bookedroom }) => {
  const title = ['Room Type', 'Room Name', 'Duration', 'Price', 'Quantity'];
  console.log(bookedroom);

  const handleDuration = (day) => {
    const newData = day.split(' ');
    return newData[0];
  };

  return (
    <div className="flex flex-col gap-4">
      <table class="table-fixed">
        <thead>
          <tr>
            {title.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bookedroom?.map((item) => (
            <tr>
              <td>{item.room.type}</td>
              <td>{item.room.name}</td>
              <td>
                from {handleDuration(item.check_in)}
                <br /> to {handleDuration(item.check_out)}
              </td>
              <td>{item.room.price}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const BookingModal = ({ closeModal, item }) => {
  const roomQuantity = item?.bookedroom?.map((item) => item.quantity);
  const totalQuantity = roomQuantity?.reduce((acc, curr) => acc + curr, 0);
  console.log(item);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="fixed z-50 flex flex-col justify-between w-[85%] px-12 py-8 bg-white h-[85%] ">
        <div className="flex flex-col flex-1 justify-evenly">
          <BookingModalHeader
            closeModal={closeModal}
            item={item}
            img={item?.hotel?.list_image[0]?.url}
          />
          <BookedRoom bookedroom={item.bookedroom} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 ">
            <div>Total Room:</div>
            <div className="pr-[160px]">{totalQuantity}</div>
          </div>
          <button
            className="px-6 py-2 text-xl font-bold text-right text-white rounded bg-lightGreen"
            onClick={closeModal}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
