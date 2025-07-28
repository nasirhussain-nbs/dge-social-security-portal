import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setCurrentStep,
  updateFormData,
  submitApplication,
  resetForm,
  createInitialFormData,
} from "../store/slices/applicationSlice";
import { addNotification } from "../store/slices/uiSlice";
import { getStepFields, isLastStep } from "../utils/formHelpers";

const TOTAL_STEPS = 3;

const useApplicationForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentStep, formData, loading } = useSelector(
    (state) => state.application,
  );

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: formData,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const watchedValues = watch();

  const handleContinue = async () => {
    const stepFields = getStepFields(currentStep);
    const isStepValid = await trigger(stepFields);
    if (isStepValid) {
      if (currentStep < TOTAL_STEPS - 1) {
        dispatch(updateFormData(watchedValues));
        dispatch(setCurrentStep(currentStep + 1));
      } else {
        await handleSubmit(onSubmit)();
      }
    } else {
      dispatch(
        addNotification({
          type: "error",
          message: t("form.validation.pleaseFillRequired"),
        }),
      );
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      dispatch(setCurrentStep(currentStep - 1));
    }
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(submitApplication(data)).unwrap();

      navigate("/success");

      reset(createInitialFormData());
    } catch (error) {
      dispatch(
        addNotification({
          type: "error",
          message: error.message || t("messages.error"),
        }),
      );
    }
  };

  const handleReset = () => {
    dispatch(resetForm());
    reset(createInitialFormData());
  };

  return {
    control,
    setValue,
    watch: watchedValues,
    currentStep,
    totalSteps: TOTAL_STEPS,
    isLastStep: isLastStep(currentStep, TOTAL_STEPS),
    handleContinue,
    handleBack,
    handleReset,
    loading,
    errors,
    isValid,
  };
};

export default useApplicationForm;
