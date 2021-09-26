import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://613334927859e700176a3653.mockapi.io/orders');
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (e) {
        console.error(`Ошибка при запросе заказов ${e}`);
      }
    })();
  }, []);

  return (
    <div className="main">
      <div className="main__inner-src-title">
        <h1 className="main__title">Мои заказы</h1>
      </div>
      <div className="main__inner-elems">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            loading={isLoading}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Orders;
