function Drawer({ onClose, deleteFromCart, items = [] }) {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="drawer__title">
          Корзина
          <img className="btn-cancel" onClick={onClose} src="./img/cancel-cart.svg" alt="Cancel" />
        </h2>

        {items.length === 0 ?
          <div className="emptyCart">
            <img className="emptyCart__img" width={120} heigth={120} src="./img/EmptyBox.jpg" alt="Пустой коробок" />
            <h3 className="emptyCart__title">Корзина пустая</h3>
            <p className="emptyCart__text">Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
            <button className="greenButton greenButton--small" onClick={onClose}>Вернуться назад</button>
          </div> 
          :
          <>
            <div className="drawer__items">
              {items.map(obj => (
                <div key={obj.id} className="cart-item">
                  <div className="cart-item__img" style={{ backgroundImage: `url(${obj.imageURL})`}}></div>
                  <div className="cart-item__info">
                    <p className="cart-item__title">{obj.title}</p>
                    <b className="cart-item__price">{obj.price} руб.</b>
                  </div>
                  <img onClick={() => deleteFromCart(obj.id)} className="btn-cancel" src="./img/cancel-cart.svg" alt="Cancel" />
                </div>)
              )}
            </div>
            <div className="cart-total-block">
              <ul>
                <li className="cart-total-block__elem">
                  <span className="cart-total-block__total">Итого:</span>
                  <div className="cart-total-block__dashed"></div>
                  <b className="cart-total-block__price">21 498 руб.</b>
                </li>
                <li className="cart-total-block__elem">
                  <span className="cart-total-block__total">Налог 5%:</span>
                  <div className="cart-total-block__dashed"></div>
                  <b className="cart-total-block__price">1074 руб.</b>
                </li>
              </ul>
              <button className="greenButton greenButton--big">Оформить заказ</button>
            </div>
          </>

        
      }
      </div>
    </div>
  )
}

export default Drawer;