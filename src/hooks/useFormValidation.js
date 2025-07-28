import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { createValidationRules } from "../utils/formValidation";

export const useFormValidation = () => {
  const { t } = useTranslation();

  const getValidationRules = useCallback(
    (fieldName, required = false) => {
      return createValidationRules(fieldName, required, t);
    },
    [t],
  );

  const validateStep = useCallback(
    (stepFields, formData) => {
      const errors = {};

      stepFields.forEach((field) => {
        const value = formData[field];
        const rules = getValidationRules(field, true);

        if (rules.required && (!value || value.trim() === "")) {
          errors[field] = rules.required;
        }
      });

      return {
        isValid: Object.keys(errors).length === 0,
        errors,
      };
    },
    [getValidationRules],
  );

  return {
    getValidationRules,
    validateStep,
  };
};
