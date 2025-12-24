import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwtToken: localStorage.getItem("token") || "",
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: {
      prepare(userInfo) {
        const segment = () => Math.random().toString(36).substring(2);
        const token = `${segment()}.${segment()}.${segment()}`;
        return {
          payload: { token, user: userInfo },
        };
      },
      reducer(state, action) {
        const { token, user } = action.payload;
        state.jwtToken = token;
        state.user = user;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      },
    },
    logout(state) {
      state.jwtToken = "";
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { signup, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
