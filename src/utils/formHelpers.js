import { FORM_STEPS } from "./constants";

export const getStepFields = (step) => {
  const fieldMap = {
    [FORM_STEPS.PERSONAL_INFO]: [
      "name",
      "nationalId",
      "dateOfBirth",
      "gender",
      "address",
      "city",
      "state",
      "country",
      "phone",
      "email",
    ],
    [FORM_STEPS.FAMILY_FINANCIAL]: [
      "maritalStatus",
      "dependents",
      "employmentStatus",
      "monthlyIncome",
      "housingStatus",
    ],
    [FORM_STEPS.SITUATION_DESCRIPTIONS]: [
      "financialSituation",
      "employmentCircumstances",
      "reasonForApplying",
    ],
  };
  return fieldMap[step] || [];
};

export const isLastStep = (currentStep, totalSteps) => {
  return currentStep === totalSteps - 1;
};

export const getFieldCharacterCount = (value) => {
  return value ? value.length : 0;
};

export const getCharacterCountColor = (value, limit) => {
  const count = getFieldCharacterCount(value);
  const ratio = count / limit;

  if (ratio > 0.95) return "error.main";
  if (ratio > 0.8) return "warning.main";
  return "text.secondary";
};
