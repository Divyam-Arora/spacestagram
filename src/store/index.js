import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialDate = {
  date: `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`,
  count: 10,
};

const dateSlice = createSlice({
  name: "date",
  initialState: initialDate,
  reducers: {
    setDate: (state, actions) => {
      state.date = actions.payload.date;
      state.count = actions.payload.count;
    },
  },
});

const initialLikeList = { liked: null };

const likedSlice = createSlice({
  name: "liked",
  initialState: initialLikeList,
  reducers: {
    init: (state, actions) => {
      state.liked = actions.payload;
    },
    addLike: (state, actions) => {
      state.liked.push(actions.payload);
    },
    removeLike: (state, actions) => {
      state.liked.splice(
        state.liked.findIndex((val) => val === actions.payload),
        1
      );
    },
  },
});

const store = configureStore({
  reducer: {
    date: dateSlice.reducer,
    liked: likedSlice.reducer,
  },
});

export const dateActions = dateSlice.actions;
export const likedActions = likedSlice.actions;

export default store;
