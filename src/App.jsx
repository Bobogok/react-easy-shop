import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios
      .get('https://613334927859e700176a3653.mockapi.io/items')
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get('https://613334927859e700176a3653.mockapi.io/cart')
      .then((res) => {
        setCartItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setSearchValue('');
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const onAddToCart = (obj) => {
    axios.post('https://613334927859e700176a3653.mockapi.io/cart/', obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const deleteFromCart = (id) => {
    console.log('ID', id);
    axios.delete(`https://613334927859e700176a3653.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onAddToFavorite = (obj) => {
    axios.post('https://613334927859e700176a3653.mockapi.io/favorites/', obj);
    setFavorites((prev) => [...prev, obj]);
  };

  const deleteFromFavorite = (id) => {
    console.log('ID', id);
    axios.delete(`https://613334927859e700176a3653.mockapi.io/favorites/${id}`);
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="wrapper">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} deleteFromCart={deleteFromCart} />}

      <Header onClickCart={() => setCartOpened(true)} />

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
        <div className="main__inner-elems">
          {items
            .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
            .map((item) => (
              <Card
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                imageURL={item.imageURL}
                onPlus={onAddToCart}
                deleteFromCart={deleteFromCart}
                onFavorite={onAddToFavorite}
                deleteFromFavorites={deleteFromFavorite}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
