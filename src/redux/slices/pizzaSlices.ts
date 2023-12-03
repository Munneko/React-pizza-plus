import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

type SortType = {
  sortProperty: string;
};

type FetchPizzasArgs = {
  category: string;
  search: string;
  pageCount: number;
  sortType: SortType;
  order: string;
};

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params: FetchPizzasArgs) => {
    const { category, search, pageCount, sortType, order } = params;
    const {data}= await axios.get<PizzaItem[]>(
      `https://646fa44a09ff19b1208798a8.mockapi.io/pizzas?page=${pageCount}&limit=4&${category}&sortBy=${sortType.sortProperty}&order=${order}${search}`,
    );
    return data as PizzaItem[] ;
  },
);

type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: string[number];
};

export enum Status {
  LOADING ='loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

type PizzaSliceState = {
  items: PizzaItem[];
  status: Status
};

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
