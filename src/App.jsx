/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import AppContext from './context';
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
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://613334927859e700176a3653.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://613334927859e700176a3653.mockapi.io/cart', obj);
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
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.error(error);
    }
  };

  const deleteFromCart = (id) => {
    try {
      axios.delete(`https://613334927859e700176a3653.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.error(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onAddToFavorite = async (obj) => {
    try {
      const findItem = favorites.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        await axios.delete(`https://613334927859e700176a3653.mockapi.io/favorites/${findItem.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
      } else {
        const { data } = await axios.post('https://613334927859e700176a3653.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (e) {
      console.error(`Не удалось добавить в фавориты ${e}`);
    }
  };

  const deleteFromFavorite = (id) => {
    axios.delete(`https://613334927859e700176a3653.mockapi.io/favorites/${id}`);
    setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  const isItemFavorite = (id) => {
    return favorites.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        isItemFavorite,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems
      }}>
      <div className="wrapper">
        {cartOpened && (
          <Drawer items={cartItems} onClose={() => setCartOpened(false)} deleteFromCart={deleteFromCart} />
        )}

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
            isLoading={isLoading}
          />
        </Route>

        <Route exact path="/favorites">
          <Favorites deleteFromFavorite={deleteFromFavorite} />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
