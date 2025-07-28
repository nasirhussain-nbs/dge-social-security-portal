import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  IconButton,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Close as CloseIcon,
  Edit as EditIcon,
  Check as CheckIcon,
} from "@mui/icons-material";
import { acceptAISuggestion } from "../../store/slices/applicationSlice";
import FormField from "./FormField";
import { useAIAssistant } from "../../hooks/useAIAssistant";

const AISuggestionDialog = ({ setValue }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { aiDialog, closeDialog, t } = useAIAssistant();
  const [isEditing, setIsEditing] = useState(false);

  const {
    control,
    watch,
    setValue: setFormValue,
  } = useForm({
    defaultValues: {
      editedSuggestion: aiDialog.editedText || aiDialog.suggestion,
    },
  });

  const editedValue = watch("editedSuggestion");

  React.useEffect(() => {
    if (aiDialog.suggestion) {
      setFormValue(
        "editedSuggestion",
        aiDialog.editedText || aiDialog.suggestion
      );
    }
  }, [aiDialog.suggestion, aiDialog.editedText]);

  const handleClose = () => {
    closeDialog();
    setIsEditing(false);
  };

  const handleAccept = () => {
    const finalText = isEditing ? editedValue : aiDialog.suggestion;
    dispatch(
      acceptAISuggestion({
        fieldType: aiDialog.fieldType,
        suggestion: finalText,
      })
    );
    setValue(aiDialog.fieldType, finalText);
    handleClose();
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setFormValue("editedSuggestion", aiDialog.suggestion);
    }
  };

  return (
    <Dialog
      open={aiDialog.open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {t("ai.dialogTitle")}
          </Typography>
          <IconButton
            onClick={handleClose}
            size="small"
            aria-label={t("buttons.close")}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {t("ai.dialogDescription")}
        </Typography>

        {isEditing ? (
          <FormField
            name="editedSuggestion"
            control={control}
            label={t("ai.editLabel")}
            multiline
            rows={6}
            placeholder={t("ai.editPlaceholder")}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
                transition: "all 0.2s ease",
                "&:hover": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: alpha(theme.palette.primary.main, 0.4),
                  },
                },
                "&.Mui-focused": {
                  backgroundColor: theme.palette.background.paper,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderWidth: "1px",
                    borderColor: theme.palette.primary.main,
                  },
                },
              },
              "& .MuiInputLabel-root": {
                fontWeight: 500,
              },
              "& .MuiOutlinedInput-input": {
                fontSize: "1rem",
                lineHeight: 1.6,
              },
            }}
          />
        ) : (
          <Box
            sx={{
              p: 3,
              backgroundColor: alpha(theme.palette.grey[50], 0.5),
              border: `1px solid ${alpha(theme.palette.grey[300], 0.5)}`,
              borderRadius: 2,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.6,
                whiteSpace: "pre-wrap",
              }}
            >
              {aiDialog.suggestion}
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Button
          onClick={toggleEdit}
          startIcon={<EditIcon />}
          variant="outlined"
          aria-label={isEditing ? t("buttons.discard") : t("buttons.edit")}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
          }}
        >
          {isEditing ? t("buttons.discard") : t("buttons.edit")}
        </Button>

        <Button
          onClick={handleAccept}
          startIcon={<CheckIcon />}
          variant="contained"
          aria-label={t("buttons.accept")}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          {t("buttons.accept")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AISuggestionDialog;
