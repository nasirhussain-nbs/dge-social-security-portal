import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  ListItemText,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Language as LanguageIcon,
  ExpandMore as ExpandMoreIcon,
  RestartAlt as ResetIcon,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addNotification } from "../../store/slices/uiSlice";

const SUPPORTED_LANGUAGES = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
  },
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
  },
];

const LanguageDropdown = () => {
  const { t, i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);

  const currentLanguage =
    SUPPORTED_LANGUAGES.find((lang) => lang.code === i18n.language) ||
    SUPPORTED_LANGUAGES[0];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = async (languageCode) => {
    try {
      await i18n.changeLanguage(languageCode);
      handleClose();
    } catch (error) {
      dispatch(
        addNotification({
          type: "error",
          message: t("errors.languageChangeFailed"),
        })
      );
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        startIcon={<LanguageIcon />}
        endIcon={<ExpandMoreIcon />}
        color="inherit"
        sx={{
          textTransform: "none",
          borderRadius: 2,
          px: 2,
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <span>{currentLanguage.nativeName}</span>
        </Box>
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 140,
            mt: 1,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {SUPPORTED_LANGUAGES.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            selected={language.code === i18n.language}
            sx={{ py: 1.5 }}
          >
            <ListItemText primary={language.nativeName} sx={{ pl: 1 }} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

const Header = ({ showReset = true, handleReset }) => {
  const { t } = useTranslation();

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {t("app.title")}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {showReset && (
            <Tooltip title="Reset Form">
              <IconButton
                color="inherit"
                onClick={handleReset}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <ResetIcon />
              </IconButton>
            </Tooltip>
          )}

          <LanguageDropdown />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
