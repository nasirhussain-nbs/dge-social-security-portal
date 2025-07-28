import React from "react";
import { Box, CircularProgress } from "@mui/material";

const LoadingSpinner = ({
  size = 40,
  centered = true,
  color = "primary",
  variant = "indeterminate",
  ...props
}) => {
  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
      {...props}
    >
      <CircularProgress size={size} color={color} variant={variant} />
    </Box>
  );

  if (centered) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 200,
          width: "100%",
        }}
      >
        {content}
      </Box>
    );
  }

  return content;
};

export default LoadingSpinner;
