import ValidateRule from "@/utils/validator/validate-rule";
import PrintUtil from "@/utils/localization/print.util";

export default class ValidatorUtil {
  public rules: Record<string, ValidateRule>[] = [];

  constructor() {}

  addRule(name: string, rule: ValidateRule) {
    this.rules[name] = rule;
    return this;
  }

  validate(data: any): Record<string, boolean>[] | boolean {
    let res = {};
    Object.keys(data).forEach((el) => {
      const rule = this.rules[el];
      if (!rule) return;
      res[el] = this.rules[el].check(data[el]);
    });
    if (res && Object.values(res).some((el) => !el)) return res;
    else return true;
  }

  showErrorToast(toast) {
    toast.add({
      severity: "error",
      summary: PrintUtil.localize("validateError", "components"),
      detail: PrintUtil.localize("checkDataProvided", "components"),
      life: 3000,
    });
  }

  static getNullIfNoChange(newValue, oldValue) {
    return newValue == oldValue ? null : newValue;
  }
}
