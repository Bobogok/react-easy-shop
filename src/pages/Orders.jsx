import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

  if (isLoading) {
    return (
      <div className="main">
        <div className="cards">
          <div className="cards__inner">
            <div className="cards__inner-elems">
              {[...Array(4)].map((item, index) => (
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
        </div>
      </div>
    );
  }

  return (
    <div className="main">
      {orders.length === 0 ? (
        <div className="empty">
          <div className="empty__inner">
            <img className="empty__image" height={70} width={70} src="./img/SmileSad.png" alt="sad smile" />
            <h2 className="empty__title">У вас нет заказов</h2>
            <p className="empty__description">Здесь будут отображены ваши заказы</p>
            <Link to="/">
              <button className="greenButton greenButton--small" type="button">
                Вернуться назад
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="cards">
          <div className="cards__inner">
            <div className="cards__inner-src-title">
              <h1 className="cards__title">Мои заказы</h1>
            </div>
            <div className="cards__inner-elems">
              {orders.map((item, index) => (
                <Card
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...item}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
