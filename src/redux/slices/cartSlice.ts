import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
// import { getCartFromLS} from '../../utils/getCartFromLS';

export type TCartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  // types: number;
  type:string;
  count: number;
};

type CartSliceState = {
  totalPrice: number;
  items: TCartItem[];
};

// const {items, totalPrice} = getCartFromLS();
// console.log(items, totalPrice);

// const initialState: CartSliceState = {
//   totalPrice,
//   items,
// };
const initialState: CartSliceState = {
  totalPrice: 0,
  items: []
};

// const initialState: CartSliceState = getCartFromLS();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItem(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    addItem(state, action: PayloadAction<TCartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state:RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
