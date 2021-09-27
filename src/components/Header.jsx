import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CartSVG from '../../public/img/cart.svg';
import FavoriteSVG from '../../public/img/favorite.svg';
import ProfileSVG from '../../public/img/profile.svg';

function Header(props) {
  const { totalPrice } = useCart();
  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/">
          <div className="header__logoBox">
            <img width={40} height={40} src="./img/MainLogo.png" alt="" />
            <div className="header__content-title">
              <h3 className="header__title">React card</h3>
              <p className="header__text">Магазин лучших кроссовок</p>
            </div>
          </div>
        </Link>
        <ul className="header__menu">
          <li className="header__menu-elem" onClick={props.onClickCart}>
            <CartSVG width={20} height={20} />
            <span>{totalPrice} руб.</span>
          </li>
          <li className="header__menu-elem">
            <Link to="/favorites">
              <FavoriteSVG width={21} height={19} />
            </Link>
          </li>
          <li className="header__menu-elem">
            <Link to="/orders">
              <ProfileSVG width={20} height={20} />
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
