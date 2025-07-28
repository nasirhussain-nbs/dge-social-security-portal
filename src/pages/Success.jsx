import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Box, Typography, Button, Fade } from "@mui/material";
import {
  Celebration as CelebrationIcon,
  Home as HomeIcon,
} from "@mui/icons-material";
import { resetForm } from "../store/slices/applicationSlice";
import Header from "../components/Layout/Header";

const Success = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetForm());
  }, [dispatch]);

  const handleNewApplication = () => {
    navigate("/");
  };

  return (
    <Box>
      <Header showReset={false} />
      <Container maxWidth="sm" sx={{ py: { xs: 4, md: 8 } }}>
        <Fade in={true} timeout={800}>
          <Paper
            elevation={3}
            sx={{
              p: { xs: 4, sm: 6 },
              borderRadius: 3,
              textAlign: "center",
            }}
          >
            <Fade in={true} timeout={1000} style={{ transitionDelay: "200ms" }}>
              <Box sx={{ mb: 3 }}>
                <CelebrationIcon
                  sx={{
                    fontSize: { xs: 60, md: 80 },
                    color: "primary.main",
                    mb: 2,
                  }}
                />
              </Box>
            </Fade>

            <Fade in={true} timeout={1000} style={{ transitionDelay: "400ms" }}>
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                    fontSize: { xs: "1.75rem", sm: "2rem" },
                    mb: 2,
                  }}
                >
                  {t("success.title")}
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.6,
                    fontSize: { xs: "0.95rem", sm: "1rem" },
                  }}
                >
                  {t("success.description")}
                </Typography>
              </Box>
            </Fade>

            <Fade in={true} timeout={1000} style={{ transitionDelay: "600ms" }}>
              <Box>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<HomeIcon />}
                  onClick={handleNewApplication}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  {t("success.newApplication")}
                </Button>
              </Box>
            </Fade>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default Success;
