import React, { useState, useEffect } from 'react';


function Card({ id, imageURL, title, price, onPlus, onFavorite, deleteFromCart }) {
  const [isAdded, setIsAdded] = useState(false);

  const onClickPlus = () => {
    onPlus({ id, imageURL, title, price });
    setIsAdded(true);
  }

  const onDeleteFromCart = () => {
    deleteFromCart(id);
    setIsAdded(false);
  }

  return (
    <div className="card">
      <div className="card__favorite" onClick={onFavorite}>
        <img src="./img/unlike.svg" alt="Like" />
      </div>
      <img className="card__img" width={133} heigth={112} src={imageURL} alt="" />
      <h5 className="card__title">{title}</h5>
      <div className="card__bottomSide">
        <div className="card__priceContant">
          <span className="card__priceTitle">ЦЕНА:</span>
          <b className="card__price">{price} руб.</b>
        </div>
        <button className="card__btnToCart" onClick={isAdded ? onDeleteFromCart : onClickPlus}>
          <img src={isAdded ? "./img/addComplete.svg" : "./img/AddToCart.svg"} alt="" />
        </button>
      </div>
    </div>
  )
}

export default Card;