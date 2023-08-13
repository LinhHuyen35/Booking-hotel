import { Card, Title, DonutChart, Button, Flex } from '@tremor/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

const rate = [
  {
    name: 'New York',
    vote: 9800,
  },
  {
    name: 'London',
    vote: 4567,
  },
  {
    name: 'Hong Kong',
    vote: 3908,
  },
  {
    name: 'San Francisco',
    vote: 2400,
  },
  {
    name: 'Singapore',
    vote: 1908,
  },
];

//const valueFormatter = (number) => ` ${Intl.NumberFormat('us').format(number).toString()}`;
export const RoundChart = ({ hotelId }) => {
  console.log(hotelId);
  const [data, setData] = useState([
    {
      name: '5 stars',
      vote: 9800,
    },
    {
      name: '4 stars',
      vote: 4567,
    },
    {
      name: '3 stars',
      vote: 3908,
    },
    {
      name: '2 stars',
      vote: 2400,
    },
    {
      name: '1 stars',
      vote: 1908,
    },
  ]);
  console.log(data);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `https://103.184.113.181:447/rating/hotel?hotel_id=${hotelId}`
      );
      const newArr = Object.values(res.data).slice(2);
      const newData = data.map((object, index) => ({
        ...object,
        vote: newArr[index],
      }));
      setData(newData);
    };
    fetchData();
  }, [data, hotelId]);
  return (
    <Card>
      <Title>Vote</Title>
      <DonutChart
        className="mt-6 h-96 "
        data={data}
        category="vote"
        index="name"
        variant="pie"
        showLabel="true"
        colors={['red', 'amber', 'indigo', 'lime', 'slate']}
      />
      <Flex justifyContent="end" className="space-x-2">
        <Button
          size="xs"
          variant="primary"
          onClick={() => console.log('clicked')}
        >
          View more
        </Button>
      </Flex>
    </Card>
  );
};
