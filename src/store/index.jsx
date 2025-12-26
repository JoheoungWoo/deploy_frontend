import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slice/loginSlice";
import React from "react";

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export default store;
