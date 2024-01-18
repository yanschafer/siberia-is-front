import LinkedRuleDto from "@/api/modules/rbac/dto/rules/linked-rule.dto";

export default class UserDto {
  constructor(
    public id: number,
    public name: string,
    public login: string,
    public lastLogin: number,
    public rules: LinkedRuleDto[] = [],
  ) {}
}
