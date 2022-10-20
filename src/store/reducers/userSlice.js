import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  user: null,
  isAuthenticated: false,
  activated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setActivated(state, action) {
      state.activated = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload.user;
    },
    setUsername(state, action) {
      state.user.username = action.payload;
    },
    setBasicInfo(state, action) {
      state.user.info.links = action.payload;
    },
  
    addNewEducation(state, action) {
      if (!state.user.info.education) {
        state.user.info.education = [];
      }
      state.user.info.education.push({
        key: Date.now().toString(),
      });
    },
    editEducation(state, action) {
      const { eduInfo, key } = action.payload;
      console.log("reached", eduInfo);
      const index = state.user.info.education.findIndex(
        (edu) => edu.key === key
      );
      state.user.info.education[index] = { key, ...eduInfo };
    },
    deleteEducation(state, action) {
      state.user.info.education = state.user.info.education.filter(
        (edu) => edu.key !== action.payload.key
      );
    },
    setSkillsInfo(state, action) {
      if (!state.user.info.skills) state.user.info.skills = [];
      state.user.info.skills.push(action.payload);
    },
    deleteSkill(state, action) {
      state.user.info.skills = state.user.info.skills.filter(
        (skill) => skill !== action.payload
      );
    },
    addNewExperience(state, action) {
      if (!state.user.info.experience) {
        state.user.info.experience = [];
      }
      state.user.info.experience.push({
        key: Date.now().toString(),
      });
    },
    editExperience(state, action) {
      const { expInfo, key } = action.payload;
      const index = state.user.info.experience.findIndex(
        (exp) => exp.key === key
      );
      state.user.info.experience[index] = { key, ...expInfo };
    },
    deleteExperience(state, action) {
      state.user.info.experience = state.user.info.experience.filter(
        (exp) => exp.key !== action.payload.key
      );
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
