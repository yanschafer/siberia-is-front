import LinkedRuleDto from "@/api/modules/rbac/dto/rules/linked-rule.dto";

export default class RoleDto {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public rules: LinkedRuleDto[]
  ) {
  }
}