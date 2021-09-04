import React, { useState, useEffect } from 'react';
import styles from './Card.module.scss';

console.log(styles);

function Card({ imageURL, title, price, onPlus, onFavorite }) {
  const [isAdded, setIsAdded] = useState(false);

  const onClickPlus = () => {
    onPlus({ imageURL, title, price });
    setIsAdded(!isAdded);
  }

  useEffect(() => {
    console.log('Пременная изменилась');
  }, [isAdded]);

  console.log(isAdded);

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onFavorite}>
        <img src="./img/unlike.svg" alt="Like" />
      </div>
      <img width={133} heigth={112} src={imageURL} alt="" />
      <h5>{title}</h5>
      <div className={styles.bottomSide}>
        <div className="price-contant">
          <span>ЦЕНА:</span>
          <b>{price} руб.</b>
        </div>
        <button className={styles.btnToCart} onClick={onClickPlus}>
          <img src={isAdded ? "./img/addComplete.svg" : "./img/AddToCart.svg"} alt="" />
        </button>
      </div>
    </div>
  )
}

export default Card;