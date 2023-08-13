import { useEffect, useState } from 'react';
import { Card, Grid, Tab, TabList, Text, Title } from '@tremor/react';
import KpiCard from '../KpiCard';
import PerformanceChart from '../PerformanceChart';
import Admin from '../../../../Admin/Admin';
import { RoundChart } from '../RoundChart';
import styles from '../../../../Admin/Admin.module.css';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchHostComments,
  fetchHostHotel,
  getAllHotel,
} from 'features/hostHotelSlice';

const cx = classNames.bind(styles);
export default function KpiCardGrid() {
  const [isActive, setIsActive] = useState(0);
  const [idOfHotel, setIdOfHotel] = useState();
  const dispatch = useDispatch();

  const user = (() => {
    const storageRoomsData = JSON.parse(localStorage.getItem('userData'));
    return storageRoomsData ?? [];
  })();
  const [selectedView, setSelectedView] = useState('1');
  const hotelData = useSelector(getAllHotel);

  const handleClick = (item, index) => {
    setIsActive(index);
    setIdOfHotel(item.id);
    dispatch(fetchHostComments({ hotelId: item.id }));
  };

  useEffect(() => {
    dispatch(fetchHostHotel({ userId: user.id })).then((x) => {
      dispatch(fetchHostComments({ hotelId: x.payload[0].id }));
    });
  }, [dispatch, user.id]);

  return (
    <main className="p-2 ml-0 bg-slate-50 sm:p-10">
      <Title className="text-4xl font-bold">Dashboard</Title>
      <Text className="text-l">
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
      </Text>

      <TabList
        defaultValue="1"
        onValueChange={(value) => setSelectedView(value)}
        className="mt-6"
      >
        <Tab value="1" text="Overview" />
        <Tab value="2" text="Detail" />
      </TabList>

      {selectedView === '1' ? (
        <div className="flex gap-4">
          <aside className={cx('second-aside')}>
            <h2 className={cx('h2')}>Hotel Name</h2>
            <div className="h-full overflow-auto cursor-pointer">
              {hotelData.map((item, index) => (
                <div
                  key={item.id}
                  className={
                    isActive !== index
                      ? cx('tab_bar')
                      : 'bg-[#2e3c8f] py-[25px] px-[16px]'
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
          <div className="flex flex-col w-full">
            <Grid>
              <KpiCard hotelId={idOfHotel} />
            </Grid>
            <Grid className="gap-6">
              <div className="mt-6 ">
                <PerformanceChart />
              </div>
              <div className="mt-6">
                <RoundChart hotelId={idOfHotel} />
              </div>
            </Grid>
          </div>
        </div>
      ) : (
        <Card className="p-0 mt-6">
          <Admin />
        </Card>
      )}
    </main>
  );
}
