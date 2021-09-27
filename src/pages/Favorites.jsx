import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import AppContext from '../context';

function Favorites({ deleteFromFavorite, isLoading }) {
  const { favorites, onAddToFavorite } = React.useContext(AppContext);

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
                  favorited
                  onFavorite={onAddToFavorite}
                  deleteFromFavorite={deleteFromFavorite}
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
      {favorites.length === 0 ? (
        <div className="empty">
          <div className="empty__inner">
            <img className="empty__image" height={70} width={70} src="./img/SmileCute.png" alt="cute smile" />
            <h2 className="empty__title">Закладок нет :(</h2>
            <p className="empty__description">Вы ничего не добавляли в закладки</p>
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
              <h1 className="cards__title">Мои закладки</h1>
            </div>
            <div className="cards__inner-elems">
              {favorites.map((item, index) => (
                <Card
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  favorited
                  onFavorite={onAddToFavorite}
                  deleteFromFavorite={deleteFromFavorite}
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

export default Favorites;
