import LinkedRuleInputDto from "@/api/modules/rbac/dto/rules/linked-rule-input.dto";

export default class RoleInputDto {
  constructor(
    public name: string,
    public description: string,
    public rules: LinkedRuleInputDto[]
  ) {
  }
}