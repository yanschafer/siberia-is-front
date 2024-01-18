import ValidateRule from "@/utils/validator/validate-rule";
import loggerUtil from "@/utils/logger/logger.util";

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
    loggerUtil.debug("SHOW ERROR TOAST");
    toast.add({
      severity: "warning",
      summary: "Validate error",
      detail: "Check data provided",
      life: 3000,
    });
  }

  static getNullIfNoChange(newValue, oldValue) {
    return newValue == oldValue ? null : newValue;
  }
}
