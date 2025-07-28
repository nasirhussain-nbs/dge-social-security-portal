import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Paper, Box, Typography, Button } from "@mui/material";
import {
  Error as ErrorIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return <ErrorFallback onRefresh={this.handleRefresh} />;
    }

    return this.props.children;
  }
}

const ErrorFallback = ({ onRefresh }) => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 6, textAlign: "center", borderRadius: 3 }}>
        <ErrorIcon sx={{ fontSize: 60, color: "error.main", mb: 2 }} />
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
          {t("errors.boundary.title")}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {t("errors.boundary.description")}
        </Typography>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={onRefresh}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          {t("errors.boundary.refreshButton")}
        </Button>
      </Paper>
    </Container>
  );
};

export default ErrorBoundary;
