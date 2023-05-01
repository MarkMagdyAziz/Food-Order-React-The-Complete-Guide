import { useContext, useEffect, useState } from 'react';
import CartIcon from '../../../Cart/CartIcon';
import classes from './CartButton.module.css';
import ModalContext from '../../../../store/modal-context';
import { CartContext } from '../../../../store/cart-context';

const HeaderCartButton = (props) => {
  const ctxModal = useContext(ModalContext)
  const ctxCart = useContext(CartContext)
  const numberOfCartItems = ctxCart.items.reduce((commu,item)=>{
    return commu + item.amount;
  },0)
  const [btnHighlighted , seBtnHighlighted] = useState(false)

const btnClasses = `${classes.button} ${btnHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    seBtnHighlighted(true)
    const timer = setTimeout(() => {
      seBtnHighlighted(false)
    }, 300);

    return () => {
      clearTimeout(timer)
    }
  }, [ctxCart.items])

  const onShowModal = () =>{
    ctxModal.showHandler()
  }
  return (
    <button className={btnClasses} onClick={onShowModal}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
