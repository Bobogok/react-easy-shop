/* eslint-disable no-await-in-loop */
import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from '../hooks/useCart';
import Info from './Info';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, deleteFromCart, items = [] }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = useState(null);
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://613334927859e700176a3653.mockapi.io/orders', { items: cartItems });
      setOrderId(data.id);
      setIsOrderCompleted(true);
      setCartItems([]);

      let i = 0;
      while (i < cartItems.length) {
        const item = cartItems[i];
        await axios.delete(`https://613334927859e700176a3653.mockapi.io/cart/${item.id}`);
        await delay(350);
        // eslint-disable-next-line no-plusplus
        i++;
      }
    } catch (e) {
      console.error(`Что то пошло не так с заказом ${e}`);
    }
    setIsLoading(false);
  };

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="drawer__title">
          Корзина
          <img className="btn-cancel" onClick={onClose} src="./img/cancel-cart.svg" alt="Cancel" />
        </h2>

        {items.length === 0 ? (
          <Info
            title={isOrderCompleted ? 'Заказ оформлен!' : 'Корзина пустая'}
            description={
              isOrderCompleted
                ? `Ваш заказ ${orderId} скоро будет передан курьерской доставке`
                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
            }
            image={isOrderCompleted ? './img/CompleteOrder.jpg' : './img/EmptyBox.jpg'}
          />
        ) : (
          <>
            <div className="drawer__items">
              {items.map((obj) => (
                <div key={obj.id} className="cart-item">
                  <div className="cart-item__img" style={{ backgroundImage: `url(${obj.imageURL})` }} />
                  <div className="cart-item__info">
                    <p className="cart-item__title">{obj.title}</p>
                    <b className="cart-item__price">{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => deleteFromCart(obj.id)}
                    className="btn-cancel"
                    src="./img/cancel-cart.svg"
                    alt="Cancel"
                  />
                </div>
              ))}
            </div>
            <div className="cart-total-block">
              <ul>
                <li className="cart-total-block__elem">
                  <span className="cart-total-block__total">Итого:</span>
                  <div className="cart-total-block__dashed" />
                  <b className="cart-total-block__price">{totalPrice} руб.</b>
                </li>
                <li className="cart-total-block__elem">
                  <span className="cart-total-block__total">Налог 5%:</span>
                  <div className="cart-total-block__dashed" />
                  <b className="cart-total-block__price">{Math.floor(totalPrice * 0.05)} руб.</b>
                </li>
              </ul>
              <button
                type="button"
                className="greenButton greenButton--big"
                disabled={isLoading}
                onClick={onClickOrder}>
                Оформить заказ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Drawer;
