import i18n from 'i18next';
import { initReactI18next} from 'react-i18next';
import common_eng from "./locales/en.json"
import common_geo from "./locales/ge.json"

i18n
  .use(initReactI18next)
  .init({
    lng: "geo",
    debug: false,
    resources: {
      eng: {
        translation: common_eng
      },
      geo: {
        translation: common_geo
      }
    }
  });

export default i18n;