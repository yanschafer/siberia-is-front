import LinkedRuleDto from "@/api/modules/auth/dto/rules/linked-rule.dto";

export default class AuthorizedUserDto {
  constructor(
    public id: number,
    public rules: LinkedRuleDto[]
  ) {
  }
}