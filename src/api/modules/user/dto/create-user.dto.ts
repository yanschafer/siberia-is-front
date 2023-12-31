import LinkedRuleDto from "@/api/modules/rbac/dto/rules/linked-rule.dto";
import UserParams from "@/api/modules/user/dto/user-params.dto";

export default class CreateUserDto {
  constructor(
    public params: UserParams,
    public rules: LinkedRuleDto[],
    public roles: number[]
  ) {}
}