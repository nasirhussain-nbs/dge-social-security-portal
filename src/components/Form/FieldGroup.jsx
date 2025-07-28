import React from "react";
import { Grid, Box, Typography } from "@mui/material";

const FieldGroup = ({
  title,
  children,
  spacing = 3,
  titleVariant = "h6",
  showTitle = true,
  ...props
}) => {
  return (
    <Box {...props}>
      {showTitle && title && (
        <Typography
          variant={titleVariant}
          gutterBottom
          sx={{ mb: 2, fontWeight: 600 }}
        >
          {title}
        </Typography>
      )}
      <Grid container spacing={spacing}>
        {children}
      </Grid>
    </Box>
  );
};

export default FieldGroup;
