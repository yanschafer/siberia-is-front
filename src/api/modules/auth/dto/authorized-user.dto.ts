import LinkedRuleDto from "@/api/modules/rbac/dto/rules/linked-rule.dto";

export default class AuthorizedUserDto {
  constructor(
    public id: number,
    public rules: LinkedRuleDto[]
  ) {
  }
}