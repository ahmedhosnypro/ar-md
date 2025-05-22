import HeaderTranslations from "@/locale/components/Header";
import LanguageTranslations from "./components/Language";

import arHeader from "@/locale/ar/header";
import arLanguage from "@/locale/ar/language";

import enHeader from "@/locale/en/header";
import enLanguage from "@/locale/en/language";

import AppLanguage from "./AppLanguage";

export type Translations = {
    headerTranslations: HeaderTranslations;
    languageTranslations: LanguageTranslations;
};

const translations: Record<AppLanguage, Translations> = {
    ar: {
        headerTranslations: arHeader,
        languageTranslations: arLanguage,
    },
    en: {
        headerTranslations: enHeader,
        languageTranslations: enLanguage,
    },
};

export default translations;
