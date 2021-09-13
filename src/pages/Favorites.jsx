import React from 'react';
import Card from '../components/Card';

function Favorites({ items, onAddToFavorite, onAddToCart, deleteFromCart, deleteFromFavorite }) {
  return (
    <div className="main">
      <div className="main__inner-src-title">
        <h1 className="main__title">Мои закладки</h1>
      </div>
      <div className="main__inner-elems">
        {items.map((item) => {
          console.log(item);
          return (
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              imageURL={item.imageURL}
              favorited
              onPlus={onAddToCart}
              deleteFromCart={deleteFromCart}
              onFavorite={onAddToFavorite}
              deleteFromFavorite={deleteFromFavorite}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Favorites;
