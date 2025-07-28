import React from "react";
import { Button, CircularProgress, Tooltip } from "@mui/material";
import { AutoAwesome as AIIcon } from "@mui/icons-material";
import { useAIAssistant } from "../../hooks/useAIAssistant";

const AIAssistant = ({ fieldType, currentValue, disabled = false }) => {
  const { hasActiveRequest, isGeneratingField, generateSuggestion, t } =
    useAIAssistant();
  const isLoading = isGeneratingField(fieldType);

  const handleAIHelp = () => {
    generateSuggestion(fieldType, currentValue);
  };

  const buttonLabel = isLoading ? t("ai.generating") : t("buttons.helpMeWrite");

  return (
    <Tooltip title={t("ai.dialogDescription")}>
      <span>
        <Button
          variant="outlined"
          startIcon={isLoading ? <CircularProgress size={16} /> : <AIIcon />}
          onClick={handleAIHelp}
          disabled={disabled || hasActiveRequest}
          aria-label={buttonLabel}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
            borderColor: "primary.main",
            color: "primary.main",
            "&:hover": {
              backgroundColor: "primary.50",
              borderColor: "primary.dark",
            },
          }}
        >
          {buttonLabel}
        </Button>
      </span>
    </Tooltip>
  );
};

export default AIAssistant;
