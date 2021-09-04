import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './components/Card';
import Header from './components/Header.js';
import Drawer from './components/Drawer.js';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    axios.get('https://613334927859e700176a3653.mockapi.io/items')
      .then(res => {
        setItems(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  const onAddToCart = (obj) => {
    const some = cartItems.some(elem => elem.id === obj.id);

    if (some) {
      console.log('Сникерсы уже в корзине');
    } else {
      setCartItems(prev => [...prev, obj])
    }
  }

  const deleteFromCart = (obj) => {
    setCartItems(prev => prev.filter(item => item.id !== obj.id));
  }

  return (
    <div className="wrapper">

      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} deleteFromCart={deleteFromCart} />}

      <Header onClickCart={() => setCartOpened(true)} />

      <div className="main">
        <div className="main__inner-src-title">
          <h1 className="main__title">Все кроссовки</h1>
          <div className="search">
            <img className="search__img" width={14} height={14} src="./img/Search.svg" alt="Search" />
            <input className="search__input" type="text" placeholder="Поиск..." />
          </div>
        </div>
        <div className="main__inner-elems">
          {items.map(item => (
            <Card
              key={item.id}
              id={item.id}
              title={item.title} 
              price={item.price} 
              imageURL={item.imageURL} 
              onFavorite={() => console.log('Добавили в закладки')}
              onPlus={onAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
