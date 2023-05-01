import React, { useReducer } from 'react';

export const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {}
});

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) =>
{
    let updatedItems, updatedTotalAmount;
    switch(action.type)
    {
        case 'ADD':
            updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === action.item.id
              );
              const existingCartItem = state.items[existingCartItemIndex];

              if (existingCartItem) {
                const updatedItem = {
                  ...existingCartItem,
                  amount: existingCartItem.amount + action.item.amount,
                };
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
              } else {
                updatedItems = state.items.concat(action.item);
              }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            };

        case 'REMOVE':
            const itemIndex = state.items.findIndex(item => item.id === action.id)
            const item = state.items[itemIndex]
            updatedTotalAmount = state.totalAmount - item.price;

            if (item.amount === 1) {
                updatedItems = state.items.filter(item => item.id !== action.id);
              } else {
                const updatedItem = { ...item, amount: item.amount - 1 };
                updatedItems = [...state.items];
                updatedItems[itemIndex] = updatedItem;
              }

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            };
        default:
            return defaultCartState;
    }
};
export const CartProvider = (props) =>{
const [cartState,dispatchCartAction] =useReducer(cartReducer,defaultCartState)
    const addItemHandler = (item) => {
        dispatchCartAction({type: 'ADD', item: item});
    };
    const removeItemHandler = (id) => {
        console.log('ZZS',id)

        dispatchCartAction({type: 'REMOVE', id: id});

    };
    const cartCtx = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler
    };
    return (
        <CartContext.Provider value={cartCtx}>
            {props.children}
        </CartContext.Provider>
    );
}