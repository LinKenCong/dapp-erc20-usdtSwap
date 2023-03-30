import i18next from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import Backend from "i18next-chained-backend";
import LocalStorageBackend from "i18next-localstorage-backend";

const I18N_NAME_SPACE = "translation";

i18next
  .use(initReactI18next)
  .use(Backend)
  .init({
    resources: {},
    lng: "en",
    fallbackLng: "en",
    ns: I18N_NAME_SPACE,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      backends: [
        LocalStorageBackend, // primary backend
      ],
      backendOptions: [
        {
          // prefix for stored languages
          prefix: "i18next_res_",
          // expiration
          expirationTime: 7 * 24 * 60 * 60 * 1000,
          // can be either window.localStorage or window.sessionStorage. Default: window.localStorage
          store: typeof window !== "undefined" ? window.localStorage : null,
        },
      ],
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
