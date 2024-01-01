export default class LinkedRuleInputDto {
  constructor(
    public ruleId: number,
    public stockId: number | null = null
  ) {
  }
}