import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './components/Card.js';
import Header from './components/Header.js';
import Drawer from './components/Drawer.js';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios.get('https://613334927859e700176a3653.mockapi.io/items')
      .then(res => {
        setItems(res.data)
      })
      .catch(err => {
        console.log(err)
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
    // axios.post('https://613334927859e700176a3653.mockapi.io/cart/', obj);
    setCartItems(prev => [...prev, obj]);
  }

  const deleteFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    // axios.delete(`https://613334927859e700176a3653.mockapi.io/cart/${id}`);
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }



  return (
    <div className="wrapper">

      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} deleteFromCart={deleteFromCart} />}

      <Header onClickCart={() => setCartOpened(true)} />

      <div className="main">
        <div className="main__inner-src-title">
          <h1 className="main__title">{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
          <div className="search">
            <img className="search__img" width={14} height={14} src="./img/Search.svg" alt="Search" />
            {searchValue && <img className="btn-cancel search__cancel" onClick={() => setSearchValue('')} src="./img/cancel-cart.svg" alt="Clear" />}
            <input className="search__input" onChange={onChangeSearchInput} value={searchValue} type="text" placeholder="Поиск..." />
          </div>
        </div>
        <div className="main__inner-elems">
          {items
            .filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
            .map(item => (
              <Card
                key={item.id}
                id={item.id}
                title={item.title} 
                price={item.price} 
                imageURL={item.imageURL} 
                onFavorite={() => console.log('Добавили в закладки')}
                onPlus={onAddToCart}
                deleteFromCart={deleteFromCart}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
