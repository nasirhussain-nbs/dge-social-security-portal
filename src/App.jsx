import React, { useEffect, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { useTranslation } from "react-i18next";
import ApplicationForm from "./pages/ApplicationForm";

import { createAppTheme } from "./theme";
import LoadingSpinner from "./components/Common/LoadingSpinner";
import ErrorBoundary from "./components/Common/ErrorBoundary";

const Success = React.lazy(() => import("./pages/Success"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});

const cacheLtr = createCache({
  key: "muiltr",
});

function App() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const theme = React.useMemo(() => createAppTheme(isRTL), [isRTL]);

  useEffect(() => {
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
  }, [isRTL, i18n.language]);

  return (
    <CacheProvider value={isRTL ? cacheRtl : cacheLtr}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<ApplicationForm />} />
                <Route path="/success" element={<Success />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </Box>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
