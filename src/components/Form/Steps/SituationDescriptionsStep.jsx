import React from "react";
import { useTranslation } from "react-i18next";
import { useWatch } from "react-hook-form";
import { Grid, Box, Typography, useTheme, Fade } from "@mui/material";
import FormField from "../FormField";
import FieldGroup from "../FieldGroup";
import AIAssistant from "../AIAssistant";
import { getSituationFields, FIELD_LIMITS } from "../../../config/fieldConfigs";
import { useFormValidation } from "../../../hooks/useFormValidation";
import { getCharacterCountColor } from "../../../utils/formHelpers";

const SituationDescriptionsStep = ({ control }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { getValidationRules } = useFormValidation();
  const watchedValues = useWatch({ control });

  const situationFields = getSituationFields(t);

  const fieldStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      backgroundColor: theme.palette.background.paper,
      transition: "all 0.2s ease",
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
      fontSize: { xs: "0.95rem", sm: "1rem" },
      lineHeight: 1.6,
    },
  };

  return (
    <FieldGroup title={t("form.situations.title")} showTitle={false}>
      <Grid item size={12}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: "text.primary",
            mb: 1.5,
            fontSize: { xs: "1.5rem", sm: "1.75rem" },
          }}
        >
          {t("form.situations.title")}
        </Typography>
      </Grid>

      <Fade in={true} timeout={600} style={{ transitionDelay: "200ms" }}>
        <Grid item size={12}>
          <Grid container spacing={4}>
            {situationFields.map((field) => (
              <Grid item size={12} key={field.name}>
                <Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}
                  >
                    <AIAssistant
                      fieldType={field.name}
                      currentValue={watchedValues[field.name]}
                    />
                  </Box>

                  <FormField
                    required={field.required}
                    name={field.name}
                    control={control}
                    label={field.title}
                    placeholder={field.placeholder}
                    multiline
                    rows={4}
                    rules={getValidationRules(field.name, field.required)}
                    sx={fieldStyles}
                  />

                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: getCharacterCountColor(
                          watchedValues[field.name],
                          FIELD_LIMITS.DESCRIPTION_MAX_LENGTH
                        ),
                        fontWeight: 500,
                        fontSize: "0.75rem",
                      }}
                    >
                      {watchedValues[field.name]?.length || 0} /{" "}
                      {FIELD_LIMITS.DESCRIPTION_MAX_LENGTH}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Fade>
    </FieldGroup>
  );
};

export default SituationDescriptionsStep;
