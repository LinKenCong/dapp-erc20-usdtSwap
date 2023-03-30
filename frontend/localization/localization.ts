import i18next from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";

const I18N_NAME_SPACE = "translation";

i18next
  .use(initReactI18next)
  .init({
    resources: {},
    fallbackLng: "en",
    ns: I18N_NAME_SPACE,
    interpolation: {
      escapeValue: false,
    },
  });

i18next.addResources("cn", I18N_NAME_SPACE, require("./dictionary/cn.json"));
i18next.addResources("en", I18N_NAME_SPACE, require("./dictionary/en.json"));

export const useLocalization = () => {
  const { t, i18n } = useTranslation();
  return {
    t,
    changeLanguage: (lang: string) => {
      i18n.changeLanguage(lang);
    },
    currentLanguage: () => i18n.language,
  };
};
