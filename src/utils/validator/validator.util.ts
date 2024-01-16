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
      loggerUtil.debug(this.rules, el, this.rules[el]);
      const rule = this.rules[el];
      if (!rule) return;
      const checkRes = this.rules[el].check(data[el]);
      if (!checkRes) res[el] = checkRes;
    });
    if (res && Object.keys(res).length) return res;
    else return true;
  }

  showErrorToast(toast) {
    toast.add({
      severity: "warning",
      summary: "Validate error",
      detail: "Check data provided",
      life: 3000,
    });
  }
}
