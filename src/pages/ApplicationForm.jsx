import React from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  Paper,
  Box,
  Button,
  Typography,
  Fade,
  useTheme,
  CircularProgress,
} from "@mui/material";
import {
  NavigateBefore as BackIcon,
  NavigateNext as NextIcon,
  Send as SubmitIcon,
} from "@mui/icons-material";

import StepperProgress from "../components/Form/StepperProgress";
import PersonalInfoStep from "../components/Form/Steps/PersonalInfoStep";
import FamilyFinancialStep from "../components/Form/Steps/FamilyFinancialStep";
import SituationDescriptionsStep from "../components/Form/Steps/SituationDescriptionsStep";
import AISuggestionDialog from "../components/Form/AISuggestionDialog";
import NotificationSystem from "../components/Common/NotificationSystem";

import useApplicationForm from "../hooks/useApplicationForm";
import Header from "../components/Layout/Header";

const ApplicationForm = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isRTL = theme.direction === "rtl";

  const {
    control,
    setValue,
    currentStep,
    totalSteps,
    isLastStep,
    handleContinue,
    handleBack,
    handleReset,
    loading,
  } = useApplicationForm();

  const isSendingApplication = loading.submission;

  const steps = React.useMemo(
    () => [
      <PersonalInfoStep key="personal" control={control} />,
      <FamilyFinancialStep key="family" control={control} />,
      <SituationDescriptionsStep key="situation" control={control} />,
    ],
    [control]
  );

  return (
    <Box>
      <Header handleReset={handleReset} />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            borderRadius: 3,
            minHeight: "70vh",
          }}
        >
          <StepperProgress />

          <form noValidate>
            <Fade in={true} timeout={500} key={currentStep}>
              <Box sx={{ mt: 4 }}>{steps[currentStep]}</Box>
            </Fade>

            <Box
              sx={{
                mt: 5,
                borderTop: 1,
                borderColor: "grey.200",
                pt: { xs: 0, md: 3 },
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  my: 2,
                  display: {
                    xs: "block",
                    md: "none",
                  },
                  textAlign: "center",
                }}
              >
                {t("accessibility.stepOf", {
                  current: currentStep + 1,
                  total: totalSteps,
                })}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={
                    <BackIcon
                      sx={{ transform: isRTL ? "scaleX(-1)" : "none" }}
                    />
                  }
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  size="large"
                  aria-label={t("buttons.back")}
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                >
                  {t("buttons.back")}
                </Button>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: {
                        xs: "none",
                        md: "flex",
                      },
                    }}
                  >
                    {t("accessibility.stepOf", {
                      current: currentStep + 1,
                      total: totalSteps,
                    })}
                  </Typography>

                  {isLastStep ? (
                    <Button
                      type="button"
                      variant="contained"
                      startIcon={
                        isSendingApplication ? (
                          <CircularProgress
                            size={16}
                            sx={{
                              color: "inherit",
                              "& .MuiCircularProgress-svg": {
                                display: "block",
                              },
                            }}
                          />
                        ) : (
                          <SubmitIcon
                            sx={{ transform: isRTL ? "scaleX(-1)" : "none" }}
                          />
                        )
                      }
                      onClick={handleContinue}
                      disabled={isSendingApplication}
                      size="large"
                      aria-label={
                        isSendingApplication
                          ? t("messages.sending")
                          : t("buttons.submit")
                      }
                      sx={{
                        borderRadius: 2,
                        px: 4,
                        py: 1.5,
                        textTransform: "none",
                        fontWeight: 600,
                        minWidth: { xs: 140, md: 180 },
                      }}
                    >
                      {isSendingApplication
                        ? t("messages.sending")
                        : t("buttons.submit")}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="contained"
                      endIcon={
                        <NextIcon
                          sx={{ transform: isRTL ? "scaleX(-1)" : "none" }}
                        />
                      }
                      onClick={handleContinue}
                      size="large"
                      aria-label={t("buttons.next")}
                      sx={{
                        borderRadius: 2,
                        px: 4,
                        py: 1.5,
                        textTransform: "none",
                        fontWeight: 600,
                        minWidth: { xs: 160, md: 180 },
                      }}
                    >
                      {t("buttons.next")}
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          </form>
        </Paper>

        <AISuggestionDialog setValue={setValue} />
        <NotificationSystem />
      </Container>
    </Box>
  );
};

export default ApplicationForm;
