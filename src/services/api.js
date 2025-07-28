import axios from "axios";
import i18n from "../i18n/i18n";
import { store } from "../store/store";
import { addNotification } from "../store/slices/uiSlice";

const openaiAPI = axios.create({
  baseURL: "https://api.openai.com/v1",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
  },
});

openaiAPI.interceptors.request.use(
  (config) => {
    config.headers["Accept-Language"] = i18n.language;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

openaiAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMessage = i18n.t("ai.errors.general");

    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 401:
          errorMessage = i18n.t("ai.errors.unauthorized");
          break;
        case 403:
          errorMessage = i18n.t("ai.errors.forbidden");
          break;
        case 429:
          errorMessage = i18n.t("ai.errors.rateLimited");
          break;
        case 400:
          errorMessage = i18n.t("ai.errors.badRequest");
          break;
        case 500:
        case 502:
        case 503:
          errorMessage = i18n.t("ai.errors.serverError");
          break;
        default:
          errorMessage = i18n.t("ai.errors.general");
      }
    } else if (error.code === "ECONNABORTED") {
      errorMessage = i18n.t("ai.errors.timeout");
    } else if (!error.response) {
      errorMessage = i18n.t("ai.errors.networkError");
    }

    store.dispatch(
      addNotification({
        type: "error",
        message: errorMessage,
      })
    );

    return Promise.reject(error);
  }
);

const getAIPrompts = () => {
  return {
    financialSituation: () =>
      i18n.t("ai.prompts.financialSituation", {
        currentValue: i18n.t("ai.prompts.defaults.financialSituation"),
      }),

    employmentCircumstances: () =>
      i18n.t("ai.prompts.employmentCircumstances", {
        currentValue: i18n.t("ai.prompts.defaults.employmentCircumstances"),
      }),

    reasonForApplying: () =>
      i18n.t("ai.prompts.reasonForApplying", {
        currentValue: i18n.t("ai.prompts.defaults.reasonForApplying"),
      }),
  };
};

export const generateAISuggestion = async (fieldType, currentValue) => {
  try {
    const AI_PROMPTS = getAIPrompts();
    const systemPrompt = i18n.t("ai.systemPrompt");

    const response = await openaiAPI.post("/chat/completions", {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: AI_PROMPTS[fieldType]?.(),
        },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    store.dispatch(
      addNotification({
        type: "success",
        message: i18n.t("ai.success.generated"),
      })
    );

    return {
      data: {
        suggestion: response.data.choices[0].message.content.trim(),
      },
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

const submitApplicationMock = async (data) => {
  try {
    // Mock a delay to simulate network request
    await new Promise((resolve) =>
      setTimeout(resolve, 2000 + Math.random() * 2000)
    );

    return {
      data: {
        data,
        success: true,
        message: i18n.t("messages.success"),
        submissionTime: new Date().toISOString(),
      },
    };
  } catch (error) {
    return Promise.reject(error);
  }
};

export const apiService = {
  submit: submitApplicationMock,
  generateAISuggestion,
};
