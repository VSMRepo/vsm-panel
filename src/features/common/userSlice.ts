import { UserProfile } from "@/helper/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUserInfo = createAsyncThunk<UserProfile, void>(
  "user/getUserInfo",
  async () => {
    // const response = await axios.get<APIResponse>("/workspace/home");
    // return response.data.payload;
    return {
      name: "Alex",
      avatar: "https://reqres.in/img/faces/7-image.jpg",
      emailId: "",
    };
  }
);

const initialState: UserProfile = {
  name: "",
  avatar: "",
  emailId: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getUserInfo.pending, (state) => {});
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      console.log(action.payload);
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
    });
    builder.addCase(getUserInfo.rejected, (state) => {});
  },
});

export const {} = userSlice.actions;

export default userSlice.reducer;
