export function applyLang<T extends Record<string, string | null | undefined>>(
  isArabic: boolean,
  data: T
): T {
  const result = {} as T;

  for (const key in data) {
    if (key.endsWith("_ar")) {
      const baseKey = key.replace("_ar", "") as keyof T;
      const arKey = key as keyof T;

      const arValue = data[arKey];
      const enValue = data[baseKey];

      const hasArabic =
        typeof arValue === "string" && arValue.trim() !== "";

      result[baseKey] =
        isArabic && hasArabic ? arValue! : enValue!;
    } else {
      result[key] = data[key];
    }
  }

  return result;
}

