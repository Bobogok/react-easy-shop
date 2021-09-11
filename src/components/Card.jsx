import React, { useState } from 'react';

function Card({ id, imageURL, title, price, onPlus, deleteFromCart, onFavorite, deleteFromFavorites }) {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const currObj = { id, imageURL, title, price };

  const onAddToCart = () => {
    onPlus(currObj);
    setIsAdded(true);
  };

  const onDeleteFromCart = () => {
    deleteFromCart(id);
    setIsAdded(false);
  };

  const onAddToFavorite = () => {
    onFavorite(currObj);
    setIsFavorite(true);
  };

  const onDeleteFromFavorite = () => {
    deleteFromFavorites(id);
    setIsFavorite(false);
  };

  return (
    <div className="card">
      <div className="card__favorite" onClick={isFavorite ? onDeleteFromFavorite : onAddToFavorite}>
        <img src={isFavorite ? './img/favoriteSneakers.svg' : './img/unlike.svg'} alt="Like" />
      </div>
      <img className="card__img" width={133} heigth={112} src={imageURL} alt="" />
      <h5 className="card__title">{title}</h5>
      <div className="card__bottomSide">
        <div className="card__priceContant">
          <span className="card__priceTitle">ЦЕНА:</span>
          <b className="card__price">{price} руб.</b>
        </div>
        <button type="button" className="card__btnToCart" onClick={isAdded ? onDeleteFromCart : onAddToCart}>
          <img src={isAdded ? './img/addComplete.svg' : './img/AddToCart.svg'} alt="" />
        </button>
      </div>
    </div>
  );
}

export default Card;
