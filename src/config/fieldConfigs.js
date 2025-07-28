export const getGenderOptions = (t) => [
  { value: "male", label: t("form.personalInfo.genders.male") },
  { value: "female", label: t("form.personalInfo.genders.female") },
  { value: "other", label: t("form.personalInfo.genders.other") },
];

export const getMaritalStatusOptions = (t) => [
  { value: "single", label: t("form.familyFinancial.maritalStatuses.single") },
  {
    value: "married",
    label: t("form.familyFinancial.maritalStatuses.married"),
  },
  {
    value: "divorced",
    label: t("form.familyFinancial.maritalStatuses.divorced"),
  },
  {
    value: "widowed",
    label: t("form.familyFinancial.maritalStatuses.widowed"),
  },
];

export const getEmploymentStatusOptions = (t) => [
  {
    value: "employed",
    label: t("form.familyFinancial.employmentStatuses.employed"),
  },
  {
    value: "unemployed",
    label: t("form.familyFinancial.employmentStatuses.unemployed"),
  },

  {
    value: "student",
    label: t("form.familyFinancial.employmentStatuses.student"),
  },
  {
    value: "retired",
    label: t("form.familyFinancial.employmentStatuses.retired"),
  },
];

export const getHousingStatusOptions = (t) => [
  { value: "own", label: t("form.familyFinancial.housingStatuses.own") },
  { value: "rent", label: t("form.familyFinancial.housingStatuses.rent") },
  {
    value: "livingWithFamily",
    label: t("form.familyFinancial.housingStatuses.livingWithFamily"),
  },
  {
    value: "homeless",
    label: t("form.familyFinancial.housingStatuses.homeless"),
  },
];

export const getSituationFields = (t) => [
  {
    name: "financialSituation",
    title: t("form.situations.financialSituation"),
    placeholder: t("form.situations.placeholders.financialSituation"),
    required: true,
  },
  {
    name: "employmentCircumstances",
    title: t("form.situations.employmentCircumstances"),
    placeholder: t("form.situations.placeholders.employmentCircumstances"),
    required: true,
  },
  {
    name: "reasonForApplying",
    title: t("form.situations.reasonForApplying"),
    placeholder: t("form.situations.placeholders.reasonForApplying"),
    required: true,
  },
];

export const FIELD_LIMITS = {
  DESCRIPTION_MAX_LENGTH: 1000,
  NAME_MAX_LENGTH: 100,
  NATIONAL_ID_MIN_LENGTH: 15,
  PHONE_MIN_LENGTH: 8,
  PHONE_MAX_LENGTH: 15,
};

export const INPUT_PROPS = {
  dependents: { min: 0 },
  monthlyIncome: { min: 0, step: "0.01" },
};
