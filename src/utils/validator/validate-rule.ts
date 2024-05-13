export default class ValidateRule {
  private skipOnNull: boolean = false;
  private isRequired: boolean = false;
  private checkLength: boolean = false;
  private minLength: number | null = null;
  private maxLength: number | null = null;
  private regexCheck: RegExp | null = null;
  private checkNumber: boolean = false;
  private numberRegex: RegExp = new RegExp("\\d+\\.?\\d*");
  private min: number | null = null;
  private max: number | null = null;

  public required() {
    this.isRequired = true;
    return this;
  }

  public skipIfNull() {
    this.skipOnNull = true;
    return this;
  }

  public regex(regex: RegExp) {
    this.regexCheck = regex;
    return this;
  }

  public setMinLength(min: number) {
    this.checkLength = true;
    this.minLength = min;
    return this;
  }

  public setMaxLength(max: number) {
    this.checkLength = true;
    this.maxLength = max;
    return this;
  }

  private getMinLength() {
    if (this.minLength) return this.minLength;
    else return Number.MIN_VALUE;
  }

  private getMaxLength() {
    if (this.maxLength) return this.maxLength;
    else return Number.MAX_VALUE;
  }

  public setMin(min: number) {
    this.checkNumber = true;
    this.min = min;
    return this;
  }

  public setMax(max: number) {
    this.checkNumber = true;
    this.max = max;
    return this;
  }

  private getMin() {
    if (this.min) return this.min;
    else return Number.MIN_VALUE;
  }

  private getMax() {
    if (this.max) return this.max;
    else return Number.MAX_VALUE;
  }

  check(data: any | null): boolean {
    if (data == null && this.skipOnNull) return true;

    if (this.isRequired) {
      if (this.checkNumber && !this.numberRegex.test(String(data)))
        return false;
      if (!data || data == "") return false;
    }

    if (this.checkLength) {
      if (data == null) return false;
      if (String(data).length > this.getMaxLength()) return false;
      if (String(data).length < this.getMinLength()) return false;
    }

    if (this.checkNumber) {
      if (!this.numberRegex.test(String(data))) return false;
      if (data > this.getMax()) return false;
      if (data < this.getMin()) return false;
    }

    if (this.regexCheck && !this.regexCheck.test(String(data))) return false;

    return true;
  }
}
