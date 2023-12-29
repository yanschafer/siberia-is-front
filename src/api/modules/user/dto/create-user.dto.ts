import LinkedRuleDto from "@/api/modules/auth/dto/rules/linked-rule.dto";

class UserParams {
  constructor(
    public name: string,
    public login: string,
    public password: string,
  ) {}
}

export default class CreateUserDto {
  constructor(
    public params: UserParams,
    public rules: LinkedRuleDto[],
    public roles: number[]
  ) {}
}