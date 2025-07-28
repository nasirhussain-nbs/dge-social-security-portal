import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Paper, Box, Typography, Button } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import Header from "../components/Layout/Header";

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box>
      <Header showReset={false} />
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Paper
          elevation={3}
          sx={{ p: 6, textAlign: "center", borderRadius: 3 }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            {t("errors.notFound.title")}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {t("errors.notFound.description")}
          </Typography>
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => navigate("/")}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            {t("errors.notFound.goHome")}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default NotFound;
