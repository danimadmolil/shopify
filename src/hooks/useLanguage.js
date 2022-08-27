import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
export default function useLanguage() {
  const [rt, reRender] = useState(false);
  const { i18n } = useTranslation();
  const defaultLanguage = "en";
  const LANGUAGE_STORAGE_KEY = "language";
  const language = useRef(
    window.localStorage.getItem(LANGUAGE_STORAGE_KEY) || defaultLanguage
  );
  function changeLanguage(lang) {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    language.current = lang;
    i18n.changeLanguage(lang);
    reRender(!rt);
  }
  return [language.current, changeLanguage];
}
