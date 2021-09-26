import React from 'react';
import Card from '../components/Card';
import AppContext from '../context';

function Favorites({ deleteFromFavorite }) {
  const { favorites, onAddToFavorite } = React.useContext(AppContext);

  return (
    <div className="main">
      <div className="main__inner-src-title">
        <h1 className="main__title">Мои закладки</h1>
      </div>
      <div className="main__inner-elems">
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
  );
}

export default Favorites;
