import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICoffeeItem } from '../constants';

export interface CartItem extends ICoffeeItem {
  quantity: number;
}

interface IState {
    items: CartItem[];
}
const initialState: IState = {
  items: [],
} 
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state: IState, action: PayloadAction<CartItem>) => {
        const existingItem = state.items.find((item) => item.id === action.payload.id);
        if (!existingItem) {
          state.items.push({ ...action.payload, quantity: 1 });
        } 
    },
    removeFromCart: (state: IState, action: PayloadAction<ICoffeeItem["id"]>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    incrementQuantity: (state: IState, action: PayloadAction<ICoffeeItem["id"]>) => {
      const existingItem = state.items.find((item) => item.id === action.payload);
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity ?? 1) + 1;
      }
    },
    decrementQuantity: (state: IState, action: PayloadAction<ICoffeeItem["id"]>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item?.quantity! > 1) {
        item.quantity!--;
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    }
  },
});

export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions
export default cartSlice.reducer
