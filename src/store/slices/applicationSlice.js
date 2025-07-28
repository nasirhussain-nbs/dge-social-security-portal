import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../services/api";

export const submitApplication = createAsyncThunk(
  "application/submit",
  async (applicationData, { rejectWithValue }) => {
    try {
      const response = await apiService.submit(applicationData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Submission failed"
      );
    }
  }
);

export const generateAISuggestion = createAsyncThunk(
  "application/generateAISuggestion",
  async ({ fieldType, currentValue }, { rejectWithValue }) => {
    try {
      const response = await apiService.generateAISuggestion(
        fieldType,
        currentValue
      );
      return { fieldType, suggestion: response.data.suggestion };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "AI generation failed"
      );
    }
  }
);

export const createInitialFormData = () => ({
  name: "",
  nationalId: "",
  dateOfBirth: "",
  gender: "",
  address: "",
  city: "",
  state: "",
  country: "",
  phone: "",
  email: "",

  maritalStatus: "",
  dependents: "",
  employmentStatus: "",
  monthlyIncome: "",
  housingStatus: "",

  financialSituation: "",
  employmentCircumstances: "",
  reasonForApplying: "",
});

const initialState = {
  currentStep: 0,
  formData: createInitialFormData(),
  lastSaved: null,
  aiSuggestions: {},

  loading: {
    submission: false,
    aiGeneration: null,
  },
  errors: {},
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
      state.lastSaved = new Date().toISOString();
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
      state.lastSaved = new Date().toISOString();
    },
    resetForm: (state) => {
      state.currentStep = 0;
      state.formData = createInitialFormData();
      state.lastSaved = null;

      state.errors = {};
      state.aiSuggestions = {};
    },
    acceptAISuggestion: (state, action) => {
      const { fieldType, suggestion } = action.payload;
      state.formData[fieldType] = suggestion;
      state.lastSaved = new Date().toISOString();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitApplication.pending, (state) => {
        state.loading.submission = true;
        state.errors.submission = undefined;
      })
      .addCase(submitApplication.fulfilled, (state) => {
        state.loading.submission = false;
      })
      .addCase(submitApplication.rejected, (state, action) => {
        state.loading.submission = false;
        state.errors.submission = action.payload;
      })
      .addCase(generateAISuggestion.pending, (state, action) => {
        state.loading.aiGeneration = action.meta.arg.fieldType;
        state.errors.aiGeneration = undefined;
      })
      .addCase(generateAISuggestion.fulfilled, (state, action) => {
        state.loading.aiGeneration = null;
        const { fieldType, suggestion } = action.payload;
        state.aiSuggestions[fieldType] = suggestion;
      })
      .addCase(generateAISuggestion.rejected, (state, action) => {
        state.loading.aiGeneration = null;
        state.errors.aiGeneration = action.payload;
      });
  },
});

export const { setCurrentStep, updateFormData, resetForm, acceptAISuggestion } =
  applicationSlice.actions;

export default applicationSlice.reducer;
