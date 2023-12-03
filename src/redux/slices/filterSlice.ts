import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type SortItem = {
  name: string;
  sortProperty: /*'rating' | 'price' | 'title'*/ string;
};

type FilterSliceState = {
  searchValue: string;
  categoryId: number;
  pageCount: number;
  sort: SortItem;
};

export const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  pageCount: 1,
  sort: { name: 'популярности', sortProperty: 'rating' },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<SortItem>) {
      state.sort = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.pageCount = Number(action.payload.pageCount);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});
export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;

export const { setCategoryId, setSort, setPageCount, setFilters, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
