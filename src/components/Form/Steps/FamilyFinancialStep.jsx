import React from "react";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import FormField from "../FormField";
import FieldGroup from "../FieldGroup";
import {
  getMaritalStatusOptions,
  getEmploymentStatusOptions,
  getHousingStatusOptions,
  INPUT_PROPS,
} from "../../../config/fieldConfigs";
import { useFormValidation } from "../../../hooks/useFormValidation";

const FamilyFinancialStep = ({ control }) => {
  const { t } = useTranslation();
  const { getValidationRules } = useFormValidation();

  const maritalStatusOptions = getMaritalStatusOptions(t);
  const employmentStatusOptions = getEmploymentStatusOptions(t);
  const housingStatusOptions = getHousingStatusOptions(t);

  return (
    <FieldGroup title={t("form.familyFinancial.title")}>
      <Grid item size={{ xs: 12, md: 6 }}>
        <FormField
          required
          name="maritalStatus"
          control={control}
          label={t("form.familyFinancial.maritalStatus")}
          type="select"
          options={maritalStatusOptions}
        />
      </Grid>

      <Grid item size={{ xs: 12, md: 6 }}>
        <FormField
          required
          name="dependents"
          control={control}
          label={t("form.familyFinancial.dependents")}
          type="number"
          placeholder="0"
          inputProps={INPUT_PROPS.dependents}
          rules={getValidationRules("dependents", true)}
        />
      </Grid>

      <Grid item size={{ xs: 12, md: 6 }}>
        <FormField
          required
          name="employmentStatus"
          control={control}
          label={t("form.familyFinancial.employmentStatus")}
          type="select"
          options={employmentStatusOptions}
        />
      </Grid>

      <Grid item size={{ xs: 12, md: 6 }}>
        <FormField
          required
          name="monthlyIncome"
          control={control}
          label={t("form.familyFinancial.monthlyIncome")}
          type="number"
          placeholder="5000"
          startAdornment="AED"
          inputProps={INPUT_PROPS.monthlyIncome}
          rules={getValidationRules("monthlyIncome", true)}
        />
      </Grid>

      <Grid item size={{ xs: 12, md: 6 }}>
        <FormField
          required
          name="housingStatus"
          control={control}
          label={t("form.familyFinancial.housingStatus")}
          type="select"
          options={housingStatusOptions}
        />
      </Grid>
    </FieldGroup>
  );
};

export default FamilyFinancialStep;
