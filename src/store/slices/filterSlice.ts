import { createSlice } from '@reduxjs/toolkit';
import {EmptyGarlicEvents, SortBy} from "@app/api/events.api";

const initialState = {
  item: EmptyGarlicEvents,
  filter: {
    category: [],
    city: [],
  },
  filteredEvents: [],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchedItem: (state, action) => {
      state.item = action.payload;
    },
    setCityFilter: (state, action) => {
      // state.query = action.payload.query;
      state.filter.city = action.payload;
    },
    changeEvents: (state, action) => {
      state.filteredEvents = action.payload;
    },
  },
});

export const { setCityFilter, changeEvents, setSearchedItem } = filterSlice.actions;

export default filterSlice.reducer;
