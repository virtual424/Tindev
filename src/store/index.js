import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import feedsReducer from "./reducers/feedSlice";

const store = configureStore({
  reducer: {
    userReducer,
    feedsReducer,
  },
});

export default store;
