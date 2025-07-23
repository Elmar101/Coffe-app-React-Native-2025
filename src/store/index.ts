import { configureStore } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import cartReducer, { CartItem } from './cartSlice';
import { safePrice } from '../helpers';

// Store configuration
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Selectors
export const selectCartItems = (state: RootState): CartItem[] => state.cart.items;

export const selectCartTotalPrice = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + safePrice(item.price) * item.quantity, 0)
);

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((count, item) => count + item.quantity, 0)
);

export const selectCartItemById = createSelector(
  [selectCartItems, (_: RootState, id: number) => id],
  (items, id) => items.find((item) => item.id === id)
);

export const selectCartItemQuantity = createSelector(
  [selectCartItemById],
  (item) => (item ? item.quantity : 1)
);

export const selectCartHasItems = createSelector(
  [selectCartItems],
  (items) => items.length > 0
);