import React, { useState } from 'react';
import ContentLoader from 'react-content-loader';

function Card({
  id,
  imageURL,
  title,
  price,
  onPlus,
  deleteFromCart,
  onFavorite,
  deleteFromFavorite,
  favorited = false,
  added = false,
  loading = false
}) {
  const [isAdded, setIsAdded] = useState(added);
  const [isFavorite, setIsFavorite] = useState(favorited);

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
    deleteFromFavorite(id);
    setIsFavorite(false);
  };

  return (
    // <div className="card">
    <>
      {loading ? (
        <ContentLoader
          className="card"
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb">
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <div className="card">
          <div className="card__favorite" onClick={isFavorite ? onDeleteFromFavorite : onAddToFavorite}>
            <img src={isFavorite ? './img/favoriteSneakers.svg' : './img/unlike.svg'} alt="Like" />
          </div>
          <img className="card__img" width="100%" height={135} src={imageURL} alt="" />
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
      )}
    </>
    // </div>
  );
}

export default Card;
