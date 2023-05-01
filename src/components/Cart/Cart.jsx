import React, { useContext, useState } from 'react'
import classes from './Cart.module.css'
import Modal from '../UI/Modal';
import ModalContext from '../../store/modal-context'
import {CartContext} from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = () =>
{
    const ctxModal = useContext(ModalContext)
    const ctxCart= useContext(CartContext)

    const totalAmount = `$${ctxCart.totalAmount.toFixed(2)}`
    const hasItems = ctxCart.items.length > 0
    const cartItemRemoveHandler = (id) => {
        ctxCart.removeItem(id)

    };
    const cartItemAddHandler = (item) => {
        ctxCart.addItem({...item,amount:1})
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
          {ctxCart.items.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              amount={item.amount}
              price={item.price}
              onRemove={cartItemRemoveHandler.bind(null, item.id)}
              onAdd={cartItemAddHandler.bind(null, item)}
            />
          ))}
        </ul>
      );
    const onClose = () =>
    {
        ctxModal.hideHandler();
    };

    return (
        <>
          { ctxModal.isShow && (
            <Modal onClose={ctxModal.hideHandler}>
                {cartItems}
                <div className={classes.total}>
                    <span>Total Amount</span>
                    <span>{totalAmount}</span>
                </div>
                <div className={classes.actions}>
                    <button onClick={onClose} className={classes[ 'button--alt' ]}>Close</button>
                    {hasItems && <button className={classes.button} >Order</button>}
                </div>
            </Modal>
        )
        }
        </>

    );
}

export default Cart