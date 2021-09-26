import React, { useContext } from 'react';
import AppContext from '../context';

const Info = ({ title, description, image }) => {
  const { setCartOpened } = useContext(AppContext);

  return (
    <div className="emptyCart">
      <img className="emptyCart__img" width={120} heigth={120} src={image} alt="Пустой коробок" />
      <h3 className="emptyCart__title">{title}</h3>
      <p className="emptyCart__text">{description}</p>
      <button type="button" className="greenButton greenButton--small" onClick={() => setCartOpened(false)}>
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;
