export default class LinkedRuleDto {
  constructor(
    public ruleId: number,
    public needStock: boolean,
    public stockId: number | null = null,
  ) {
  }
}