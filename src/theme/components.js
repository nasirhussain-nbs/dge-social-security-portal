export const createComponentOverrides = () => ({
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
        fontWeight: 500,
        borderRadius: 8,
        padding: "10px 24px",
      },
      contained: {
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-root": {
          borderRadius: 8,
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
      },
    },
  },
});

export const createPalette = () => ({
  primary: {
    main: "#1976d2",
    light: "#42a5f5",
    dark: "#1565c0",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#dc004e",
    light: "#ff5983",
    dark: "#9a0036",
    contrastText: "#ffffff",
  },
  background: {
    default: "#f5f5f5",
    paper: "#ffffff",
  },
  text: {
    primary: "#333333",
    secondary: "#666666",
  },
  error: {
    main: "#f44336",
  },
  warning: {
    main: "#ff9800",
  },
  info: {
    main: "#2196f3",
  },
  success: {
    main: "#4caf50",
  },
});

export const createTypography = () => ({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  h4: {
    fontWeight: 600,
    fontSize: "2rem",
  },
  h5: {
    fontWeight: 500,
    fontSize: "1.5rem",
  },
  h6: {
    fontWeight: 500,
    fontSize: "1.25rem",
  },
  body1: {
    fontSize: "1rem",
    lineHeight: 1.6,
  },
  body2: {
    fontSize: "0.875rem",
    lineHeight: 1.5,
  },
});

export const createShape = () => ({
  borderRadius: 12,
});
