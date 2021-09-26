import React, { useState } from 'react';
import ContentLoader from 'react-content-loader';
import AppContext from '../context';

function Card({
  id,
  imageURL,
  title,
  price,
  onPlus,
  onFavorite,
  deleteFromFavorite,
  favorited = false,
  loading = false
}) {
  const { isItemAdded, isItemFavorite } = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const obj = { id, parentId: id, imageURL, title, price };

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  const onDeleteFromFavorite = () => {
    deleteFromFavorite(id);
  };

  const locateFavorite = () => !!deleteFromFavorite;

  return (
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
          {onFavorite && (
            <div className="card__favorite" onClick={deleteFromFavorite ? onDeleteFromFavorite : onClickFavorite}>
              <img
                src={
                  // eslint-disable-next-line no-nested-ternary
                  locateFavorite()
                    ? './img/favoriteSneakers.svg'
                    : isItemFavorite(id)
                    ? './img/favoriteSneakers.svg'
                    : './img/unlike.svg'
                }
                alt="unlike"
              />
            </div>
          )}
          <img className="card__img" width="100%" height={135} src={imageURL} alt="" />
          <h5 className="card__title">{title}</h5>
          <div className="card__bottomSide">
            <div className="card__priceContant">
              <span className="card__priceTitle">ЦЕНА:</span>
              <b className="card__price">{price} руб.</b>
            </div>
            <button type="button" className="card__btnToCart" onClick={onClickPlus}>
              {onPlus && <img src={isItemAdded(id) ? './img/addComplete.svg' : './img/AddToCart.svg'} alt="" />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
