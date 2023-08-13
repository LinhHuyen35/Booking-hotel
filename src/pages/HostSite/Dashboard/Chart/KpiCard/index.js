//
import {
  BadgeDelta,
  Card,
  Grid,
  DeltaType,
  Flex,
  Metric,
  ProgressBar,
  Text,
} from '@tremor/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

type Kpi = {
  title: string,
  metric: string,
  progress: number,
  target: string,
  delta: string,
  deltaType: DeltaType,
};

const kpiData: Kpi[] = [
  {
    title: 'Profit',
    metric: '$ 12,699',
    progress: 15.9,
    target: '$ 80,000',
    delta: '13.2%',
    deltaType: 'moderateIncrease',
  },
  {
    title: 'Cancelled',
    metric: '45,564',
    progress: 36.5,
    target: '125,000',
    delta: '23.9%',
    deltaType: 'increase',
  },
  {
    title: 'Customers',
    metric: '1,072',
    progress: 53.6,
    target: '2,000',
    delta: '10.1%',
    deltaType: 'moderateDecrease',
  },
];

export default function KpiCard({ hotelId }) {
  // const [customerData, setCustomerData] = useState([]);
  const [data, setData] = useState([]);
  console.log(data);
  const date = new Date();
  const dateDay = date.toISOString().split('T')[0];
  console.log(dateDay);
  useEffect(() => {
    // const fetchData = async () => {
    //   const res = await axios.get(
    //     'https://103.184.113.181:447/kpi/customer?hotel_id='
    //   );
    //   setCustomerData(res.data);
    // };
    const fetchDashboardData = async () => {
      const [res1, res2, res3] = await Promise.all([
        await axios.get(
          `https://103.184.113.181:447/kpi/booking?hotel_id=${hotelId}&date=${dateDay}`
        ),
        await axios.get(
          `https://103.184.113.181:447/kpi/customer?hotel_id=${hotelId}&date=${dateDay}`
        ),
        await axios.get(
          `https://103.184.113.181:447/kpi/cancelled?hotel_id=${hotelId}&date=${dateDay}`
        ),
      ]);
      setData([res1.data[0], res2.data[0], res3.data[0]]);
    };
    fetchDashboardData();
    // fetchData();
  }, []);

  console.log(data);
  const itemTitle = ['Booking', 'Customer', 'Cancelled'];
  return (
    <Grid numColsLg={3} className="gap-6 mt-6">
      {data.map((item, index) => (
        <Card key={item?.id}>
          <Flex alignItems="start">
            <div className="truncate">
              <Text>{itemTitle[index]}</Text>
              <Metric className="truncate">
                {item ? item.totalNumber : 0}
              </Metric>
            </div>
            <BadgeDelta deltaType="increase">
              {item ? item.delta : 0}
            </BadgeDelta>
          </Flex>
          <Flex className="mt-4 space-x-2">
            <Text className="truncate">{`${item ? item.progress : 0}% (${
              item ? item.totalNumber : 0
            })`}</Text>
            <Text>{item ? item.target : 0}</Text>
          </Flex>
          <ProgressBar
            percentageValue={item ? item.progress : 0}
            color="purple"
            className="mt-2"
          />
        </Card>
      ))}
    </Grid>
  );
}
