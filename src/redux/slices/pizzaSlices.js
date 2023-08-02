import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { category, search, pageCount, sortType, order } = params;
  const res = await axios.get(
    `https://646fa44a09ff19b1208798a8.mockapi.io/pizzas?page=${pageCount}&limit=4&${category}&sortBy=${sortType.sortProperty}&order=${order}${search}`,
  );
  return res.data;
});

const initialState = {
  items: [],
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  // extraReducers: {
  //   [fetchPizzas.fulfilled]: (state, action) => {},
  // },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },

});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;


