import RoleDto from "@/api/modules/rbac/dto/roles/role.dto";
import LinkedRuleDto from "@/api/modules/rbac/dto/rules/linked-rule.dto";

export default class UserFullDto {
  constructor(
    public id: number,
    public name: string,
    public login: string,
    public lastLogin: number,
    public roles: RoleDto[],
    public rules: LinkedRuleDto[]
  ) {}
}