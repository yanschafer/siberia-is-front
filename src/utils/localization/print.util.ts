class PrintUtil {
  private storageKey: string = "locale"
  private selectedLang: string

  private locales = {
    "eng": () => import("./eng.locale"),
    "spanish": () => import("./spanish.locale")
  }

  public availableLocales = ["eng", "spanish"]

  private setLocale() {
    const locale = localStorage.getItem(this.storageKey)
    if (!locale) {
      this.switchTo("eng")
      return
    }
    if (locale && this.availableLocales.includes(locale))
      this.selectedLang = locale
    else
      this.selectedLang = "eng"
  }

  constructor() {
    this.setLocale()
  }

  public switchTo(locale: string) {
    localStorage.setItem(this.storageKey, locale)
    this.setLocale()
  }

  public async localize(key: string, module: string = "default"): Promise<string> {
    const localeModule = (await this.locales[this.selectedLang]()).default.modules[module]
    if (localeModule)
      return localeModule[key]
    else
      return `LOCALIZATION FOR ${module}.${key} NOT FOUND`
  }
}

export default new PrintUtil()