import React from "react";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import FormField from "../FormField";
import FieldGroup from "../FieldGroup";
import { getGenderOptions } from "../../../config/fieldConfigs";
import { useFormValidation } from "../../../hooks/useFormValidation";

const PersonalInfoStep = ({ control }) => {
  const { t } = useTranslation();
  const { getValidationRules } = useFormValidation();

  const genderOptions = getGenderOptions(t);

  return (
    <FieldGroup title={t("form.personalInfo.title")}>
      <Grid item size={{ xs: 12, md: 6 }}>
        <FormField
          name="name"
          control={control}
          label={t("form.personalInfo.name")}
          required
          rules={getValidationRules("name", true)}
        />
      </Grid>

      <Grid item size={{ xs: 12, md: 6 }}>
        <FormField
          name="nationalId"
          control={control}
          label={t("form.personalInfo.nationalId")}
          required
          placeholder="Enter your ID number"
          rules={getValidationRules("nationalId", true)}
        />
      </Grid>

      <Grid item size={{ xs: 12, md: 6 }}>
        <FormField
          name="dateOfBirth"
          control={control}
          label={t("form.personalInfo.dateOfBirth")}
          type="date"
          required
          InputLabelProps={{ shrink: true }}
          rules={getValidationRules("dateOfBirth", true)}
        />
      </Grid>

      <Grid item size={{ xs: 12, md: 6 }}>
        <FormField
          name="gender"
          control={control}
          label={t("form.personalInfo.gender")}
          type="select"
          options={genderOptions}
          required
        />
      </Grid>

      <Grid item size={12}>
        <FormField
          name="address"
          control={control}
          label={t("form.personalInfo.address")}
          multiline
          required
          rows={3}
        />
      </Grid>

      <Grid item size={{ xs: 12, md: 6 }}>
        <FormField
          name="city"
          control={control}
          label={t("form.personalInfo.city")}
          required
          rules={getValidationRules("city", true)}
        />
      </Grid>

      <Grid item size={{ xs: 12, md: 6 }}>
        <FormField
          name="state"
          control={control}
          label={t("form.personalInfo.state")}
          required
          rules={getValidationRules("state", true)}
        />
      </Grid>

      <Grid item size={{ xs: 12, md: 6 }}>
        <FormField
          name="country"
          control={control}
          label={t("form.personalInfo.country")}
          required
          rules={getValidationRules("country", true)}
        />
      </Grid>

      <Grid item size={{ xs: 12, md: 6 }}>
        <FormField
          name="phone"
          control={control}
          label={t("form.personalInfo.phone")}
          type="tel"
          required
          placeholder="Enter phone number"
          rules={getValidationRules("phone", true)}
        />
      </Grid>

      <Grid item size={12}>
        <FormField
          name="email"
          control={control}
          label={t("form.personalInfo.email")}
          type="email"
          required
          rules={getValidationRules("email", true)}
        />
      </Grid>
    </FieldGroup>
  );
};

export default PersonalInfoStep;
