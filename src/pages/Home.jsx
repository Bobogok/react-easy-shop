import React from 'react';
import Card from '../components/Card';

function Home({ items, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite, onAddToCart, isLoading }) {
  const renderItems = () => {
    const filtredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));
    return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
      <Card
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...item}
      />
    ));
  };

  return (
    <div className="main">
      <div className="main__inner-src-title">
        <h1 className="main__title">{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
        <div className="search">
          <img className="search__img" width={14} height={14} src="./img/Search.svg" alt="Search" />
          {searchValue && (
            <img
              className="btn-cancel search__cancel"
              onClick={() => setSearchValue('')}
              src="./img/cancel-cart.svg"
              alt="Clear"
            />
          )}
          <input
            className="search__input"
            onChange={onChangeSearchInput}
            value={searchValue}
            type="text"
            placeholder="Поиск..."
          />
        </div>
      </div>
      <div className="main__inner-elems">{renderItems()}</div>
    </div>
  );
}

export default Home;
