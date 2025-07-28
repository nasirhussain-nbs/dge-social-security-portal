export const validateAge = (dateString, t, minAge = 18, maxAge = 65) => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  if (age < minAge) {
    return t("form.validation.minimumAge", { min: minAge });
  }

  if (age > maxAge) {
    return t("form.validation.maximumAge", { max: maxAge });
  }

  return true;
};

export const validatePhone = (value, t) => {
  const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/;

  if (!phoneRegex.test(value)) {
    return t("form.validation.invalidPhoneChars");
  }

  const digitsOnly = value.replace(/\D/g, "");

  if (digitsOnly.length < 7) {
    return t("form.validation.phoneMinLength");
  }

  if (digitsOnly.length > 12) {
    return t("form.validation.phoneMaxLength");
  }

  return true;
};

export const validateFutureDate = (dateString, t) => {
  const today = new Date();
  const inputDate = new Date(dateString);
  return inputDate <= today || t("form.validation.futureDate");
};

export const validateDependents = (value, t) => {
  if (!/^\d+$/.test(value)) {
    return t("form.validation.numbersOnly");
  }
  return true;
};

export const validateIncome = (value, t) => {
  if (!value) return true;
  const num = parseFloat(value);
  if (isNaN(num) || num < 0) {
    return t("form.validation.positiveNumber");
  }
  return true;
};

export const createValidationRules = (fieldName, required = false, t) => {
  const rules = {};

  if (required) {
    rules.required = t("form.validation.required");
  }

  switch (fieldName) {
    case "email":
      rules.pattern = {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: t("form.validation.email"),
      };
      break;

    case "name":
    case "city":
    case "state":
    case "country":
      rules.pattern = {
        value: /^[a-zA-Z\u0600-\u06FF\s]+$/,
        message: t("form.validation.onlyLetters"),
      };
      break;

    case "nationalId":
      rules.pattern = {
        value: /^\d{15}$/,
        message: t("form.validation.invalidNationalId"),
      };
      break;

    case "dateOfBirth":
      rules.validate = (value) => validateAge(value, t);
      break;

    case "phone":
      rules.validate = (value) => validatePhone(value, t);
      break;

    case "dependents":
      rules.validate = (value) => validateDependents(value, t);
      break;

    case "monthlyIncome":
      rules.validate = (value) => validateIncome(value, t);
      break;

    case "financialSituation":
    case "employmentCircumstances":
    case "reasonForApplying":
      rules.maxLength = {
        value: 1000,
        message: t("form.validation.maxLength", { max: 1000 }),
      };
      break;

    default:
      break;
  }

  return rules;
};
