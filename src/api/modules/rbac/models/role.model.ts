import ApiResponseDto from "@/api/dto/api-response.dto";
import RoleDto from "@/api/modules/rbac/dto/roles/role.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";
import RoleSearchDto from "@/api/modules/rbac/dto/roles/role-search.dto";
import RoleInputDto from "@/api/modules/rbac/dto/roles/role-input.dto";
import RoleRemoveResultDto from "@/api/modules/rbac/dto/roles/role-remove-result.dto";
import UpdateRoleDto from "@/api/modules/rbac/dto/roles/update-role.dto";
import LinkedRuleInputDto from "@/api/modules/rbac/dto/rules/linked-rule-input.dto";
import LinkedRuleDto from "@/api/modules/rbac/dto/rules/linked-rule.dto";
import ApiModelUtil from "@/utils/api-model.util";

export default class RoleModel extends ApiModelUtil {
  constructor() {
    super("/rbac/roles");
  }
  
  public async getOne(roleId: number): Promise<ApiResponseDto<RoleDto>> {
    return this.authorizedRequest(new ApiRequestDto(`/${roleId}`, "GET"))
  }

  public async getAll(roleSearchDto: RoleSearchDto): Promise<ApiResponseDto<RoleDto[]>> {
    return this.authorizedRequest(new ApiRequestDto("/all", "POST", roleSearchDto))
  }

  public async create(roleInputDto: RoleInputDto): Promise<ApiResponseDto<RoleDto>> {
    return this.authorizedRequest(new ApiRequestDto("", "POST", roleInputDto))
  }

  public async remove(roleId: number): Promise<ApiResponseDto<RoleRemoveResultDto>> {
    return this.authorizedRequest(new ApiRequestDto(`/${roleId}`, "DELETE"))
  }

  public async update(roleId: number,  updateRoleDto: UpdateRoleDto): Promise<ApiResponseDto<RoleDto>> {
    return this.authorizedRequest(new ApiRequestDto(`/${roleId}`, "PATCH", updateRoleDto))
  }

  public async appendRules(roleId: number, linkedRuleInputDto: LinkedRuleInputDto[]): Promise<ApiResponseDto<LinkedRuleDto[]>> {
    return this.authorizedRequest(new ApiRequestDto(`/${roleId}/rules`, "POST", linkedRuleInputDto))
  }

  public async removeRules(roleId: number, linkedRuleInputDto: LinkedRuleInputDto[]): Promise<ApiResponseDto<any>> {
    return this.authorizedRequest(new ApiRequestDto(`/${roleId}/rules`, "DELETE", linkedRuleInputDto))
  }
}