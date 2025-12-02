"use client";

import useIsPreferredLanguageArabic from "./getPreferredLanguage";

type LangValue =
  | string
  | null
  | undefined
  | LangObject
  | LangValue[];

type LangObject = { [key: string]: LangValue };

export function useApplyLang<T extends LangObject>(data: T): T {
  const isArabic = useIsPreferredLanguageArabic();

  const translate = (obj: LangObject): LangObject => {
    const result: LangObject = {};

    for (const key in obj) {
      const value = obj[key];

      // ------------------
      // Handle arrays
      // ------------------
      if (Array.isArray(value)) {
        result[key] = value
          .map((item) =>
            typeof item === "object" && item !== null
              ? translate(item as LangObject)
              : item
          ) as LangValue[]; // <-- IMPORTANT FIX
        continue;
      }

      // ------------------
      // Handle nested objects
      // ------------------
      if (typeof value === "object" && value !== null) {
        result[key] = translate(value as LangObject);
        continue;
      }

      // ------------------
      // Handle Arabic key (_ar)
      // ------------------
      if (key.endsWith("_ar")) {
        const baseKey = key.replace("_ar", "");
        const arValue = value;
        const enValue = obj[baseKey];

        const hasArabic =
          typeof arValue === "string" && arValue.trim() !== "";

        result[baseKey] =
          isArabic && hasArabic ? arValue : enValue;
        continue;
      }

      // Copy normal value
      result[key] = value;
    }

    return result;
  };

  return translate(data) as T;
}
