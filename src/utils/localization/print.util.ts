import engLocale from "@/utils/localization/eng.locale";
import esLocale from "@/utils/localization/es.locale";
import ruLocale from "@/utils/localization/ru.locale";
class PrintUtil {
  private storageKey: string = "locale";
  private selectedLang: string;

  private locales = {
    eng: engLocale,
    es: esLocale,
    ru: ruLocale
  };

  public availableLocales = ["eng", "es", "ru"];

  private setLocale() {
    const locale = localStorage.getItem(this.storageKey);
    if (!locale) {
      this.switchTo("eng");
      return;
    }
    if (locale && this.availableLocales.includes(locale))
      this.selectedLang = locale;
    else this.selectedLang = "eng";
  }

  constructor() {
    this.setLocale();
  }

  public switchTo(locale: string) {
    localStorage.setItem(this.storageKey, locale);
    this.setLocale();
  }

  public localize(key: string, module: string = "default"): string {
    const localeModule = this.locales[this.selectedLang].modules[module];
    if (localeModule) return localeModule[key];
    else return `LOCALIZATION FOR ${module}.${key} NOT FOUND`;
  }
}

export default new PrintUtil();
