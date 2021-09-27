/* eslint-disable no-alert */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import AppContext from './context';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
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
    try {
      (async function fetchData() {
        const [cartResponse, favoritesResponse, itemResponse] = await Promise.all([
          axios.get('https://613334927859e700176a3653.mockapi.io/cart'),
          axios.get('https://613334927859e700176a3653.mockapi.io/favorites'),
          axios.get('https://613334927859e700176a3653.mockapi.io/items')
        ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemResponse.data);
      })();
    } catch (e) {
      console.error(`Ошибка при запросе данных ${e}`);
    }

    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setCartOpened(false);
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
    }
  };

  const deleteFromCart = (id) => {
    try {
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
      axios.delete(`https://613334927859e700176a3653.mockapi.io/cart/${id}`);
    } catch (error) {
      alert('Ошибка при удалении из корзины');
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onAddToFavorite = async (obj) => {
    try {
      const findItem = favorites.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setFavorites((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://613334927859e700176a3653.mockapi.io/favorites/${findItem.id}`);
      } else {
        setFavorites((prev) => [...prev, obj]);
        const { data } = await axios.post('https://613334927859e700176a3653.mockapi.io/favorites', obj);
        setFavorites((prev) =>
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
        console.log(favorites);
      }
    } catch (e) {
      alert(`Не удалось добавить или удалить фавориты`);
    }
  };

  const deleteFromFavorite = (id) => {
    try {
      axios.delete(`https://613334927859e700176a3653.mockapi.io/favorites/${id}`);
      setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (e) {
      alert('Ошибка при удалении из фаворитов');
    }
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
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          deleteFromCart={deleteFromCart}
          opened={cartOpened}
        />

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
          <Favorites deleteFromFavorite={deleteFromFavorite} isLoading={isLoading} />
        </Route>

        <Route exact path="/orders">
          <Orders />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
