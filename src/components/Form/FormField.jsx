import React from "react";
import { Controller } from "react-hook-form";
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  InputAdornment,
} from "@mui/material";

const FormField = ({
  name,
  control,
  label,
  type = "text",
  required = false,
  options = [],
  multiline = false,
  rows = 4,
  startAdornment,
  endAdornment,
  placeholder,
  rules = {},
  inputProps,
  InputLabelProps,
  sx,
  ...props
}) => {
  const fieldRules = {
    required: required ? `${label} is required` : false,
    ...rules,
  };

  if (type === "select") {
    return (
      <Controller
        name={name}
        control={control}
        rules={fieldRules}
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth error={!!error} required={required} sx={sx}>
            <InputLabel>{label}</InputLabel>
            <Select {...field} label={label} {...props}>
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        )}
      />
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={fieldRules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          required={required}
          multiline={multiline}
          rows={multiline ? rows : undefined}
          error={!!error}
          helperText={error?.message}
          placeholder={placeholder}
          fullWidth
          variant="outlined"
          InputLabelProps={InputLabelProps}
          inputProps={inputProps}
          sx={sx}
          InputProps={{
            startAdornment: startAdornment && (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ),
            endAdornment: endAdornment && (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ),
          }}
          {...props}
        />
      )}
    />
  );
};

export default FormField;
