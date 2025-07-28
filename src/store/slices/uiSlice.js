import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  aiDialog: {
    open: false,
    fieldType: "",
    suggestion: "",
    editedText: "",
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    openAIDialog: (state, action) => {
      state.aiDialog = {
        open: true,
        fieldType: action.payload.fieldType,
        suggestion: action.payload.suggestion,
        editedText: action.payload.suggestion,
      };
    },
    closeAIDialog: (state) => {
      state.aiDialog = {
        open: false,
        fieldType: "",
        suggestion: "",
        editedText: "",
      };
    },
  },
});

export const {
  addNotification,
  removeNotification,
  openAIDialog,
  closeAIDialog,
} = uiSlice.actions;

export default uiSlice.reducer;
