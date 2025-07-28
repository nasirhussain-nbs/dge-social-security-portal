import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { generateAISuggestion } from "../store/slices/applicationSlice";
import { openAIDialog, closeAIDialog } from "../store/slices/uiSlice";

export const useAIAssistant = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.application);
  const { aiDialog } = useSelector((state) => state.ui);

  const generateSuggestion = async (fieldType, currentValue) => {
    try {
      const result = await dispatch(
        generateAISuggestion({ fieldType, currentValue }),
      ).unwrap();

      dispatch(
        openAIDialog({
          fieldType,
          suggestion: result.suggestion,
        }),
      );
    } catch (error) {
      // No need to handle errors here, as they are already handled in the interceptors
    }
  };

  const isGeneratingField = (fieldType) => {
    return loading.aiGeneration === fieldType;
  };

  const closeDialog = () => {
    dispatch(closeAIDialog());
  };

  return {
    generateSuggestion,
    isGeneratingField,
    closeDialog,
    aiDialog,
    t,
    hasActiveRequest: loading.aiGeneration,
  };
};
