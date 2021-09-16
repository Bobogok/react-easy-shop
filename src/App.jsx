/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Header from './components/Header';
import Drawer from './components/Drawer';

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  console.log(favorites);

  useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get('https://613334927859e700176a3653.mockapi.io/cart');
      const favoritesResponse = await axios.get('https://613334927859e700176a3653.mockapi.io/favorites');
      const itemResponse = await axios.get('https://613334927859e700176a3653.mockapi.io/items');

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemResponse.data);
    }

    fetchData();

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

  const onAddToCart = async (obj) => {
    try {
      setCartItems((prev) => [...prev, obj]);
      const { data } = await axios.post('https://613334927859e700176a3653.mockapi.io/cart/', obj);
      setCartItems((prev) =>
        prev.map((item) => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            };
          }
          return item;
        })
      );
    } catch (error) {
      alert('Кажется корзина сломалась...');
      console.error(error);
    }
  };

  const deleteFromCart = (id) => {
    axios.delete(`https://613334927859e700176a3653.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
  };

  const deleteToClick = (parentId) => {
    cartItems.forEach((item) => {
      if (Number(item.parentId) === Number(parentId)) {
        axios.delete(`https://613334927859e700176a3653.mockapi.io/cart/${item.id}`);
      }
    });
    // setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onAddToFavorite = async (obj) => {
    console.log(obj);
    try {
      if (
        favorites.find((favObj) => {
          console.log(obj, favObj);
          return favObj.id === obj.id;
        })
      ) {
        axios.delete(`https://613334927859e700176a3653.mockapi.io/favorites/${obj.id}}`);
        // setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post('https://613334927859e700176a3653.mockapi.io/favorites/', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (e) {
      alert(`Не удалось добавить в фавориты ${e}`);
    }
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

      <Route exact path="/">
        <Home
          items={items}
          cartItems={cartItems}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
          deleteToClick={deleteToClick}
          deleteFromFavorite={deleteFromFavorite}
          isLoading={isLoading}
        />
      </Route>

      <Route exact path="/favorites">
        <Favorites
          items={favorites}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
          deleteFromCart={deleteFromCart}
          deleteFromFavorite={deleteFromFavorite}
        />
      </Route>
    </div>
  );
}

export default App;
