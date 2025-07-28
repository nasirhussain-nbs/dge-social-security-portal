import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Stepper, Step, StepLabel, Box } from "@mui/material";

const StepperProgress = () => {
  const { t } = useTranslation();
  const { currentStep } = useSelector((state) => state.application);
  const steps = t("navigation.steps", { returnObjects: true });

  return (
    <Box sx={{ mb: 4 }}>
      <Stepper activeStep={currentStep} alternativeLabel={true} sx={{ mb: 3 }}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel
              sx={{
                "& .MuiStepLabel-label": {
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                  fontWeight: currentStep === index ? 600 : 400,
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default StepperProgress;
