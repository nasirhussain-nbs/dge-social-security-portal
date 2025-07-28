import { createTheme } from "@mui/material";
import {
  createComponentOverrides,
  createPalette,
  createTypography,
  createShape,
} from "./components";

export const createAppTheme = (isRTL) =>
  createTheme({
    direction: isRTL ? "rtl" : "ltr",
    palette: createPalette(),
    typography: createTypography(),
    shape: createShape(),
    components: createComponentOverrides(),
  });

export * from "./components";
