import ApiModelUtil from "@/api/utils/api-model.util";
import ApiResponseDto from "@/api/dto/api-response.dto";
import UserDto from "@/api/modules/user/dto/user.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";
import LinkedRuleDto from "@/api/modules/auth/dto/rules/linked-rule.dto";
import UserSearchFilterDto from "@/api/modules/user/dto/user-search-filter.dto";
import CreateUserDto from "@/api/modules/user/dto/create-user.dto";
import UpdateUserDto from "@/api/modules/user/dto/update-user.dto";
import UserRemoveResultDto from "@/api/modules/user/dto/user-remove-result.dto";
import RoleDto from "@/api/modules/auth/dto/rules/role.dto";

export default class UserModel extends ApiModelUtil {
  constructor() {
    super("/user");
  }

  public async getCurrentUser(): Promise<ApiResponseDto<UserDto>> {
    return this.authorizedRequest(new ApiRequestDto("", "GET"))
  }
  
  public async getCurrentUserRules(): Promise<ApiResponseDto<LinkedRuleDto[]>> {
    return this.authorizedRequest(new ApiRequestDto("/rules", "GET"))
  }

  public async getCurrentUserRoles(): Promise<ApiResponseDto<number[]>> {
    return this.authorizedRequest(new ApiRequestDto("/roles", "GET"))
  }

  public async getAll(userSearchFilterDto: UserSearchFilterDto | null = null): Promise<ApiResponseDto<UserDto[]>> {
    return this.authorizedRequest(new ApiRequestDto("/all", "POST", userSearchFilterDto ? userSearchFilterDto : {}))
  }

  public async getOne(userId: number): Promise<ApiResponseDto<UserDto>> {
    return this.authorizedRequest(new ApiRequestDto(`/${userId}`, "GET"))
  }

  public async create(createUserDto: CreateUserDto): Promise<ApiResponseDto<UserDto>> {
    return this.authorizedRequest(new ApiRequestDto("", "POST", createUserDto))
  }

  public async update(userId: number, updateUserDto: UpdateUserDto): Promise<ApiResponseDto<UserDto>> {
    return this.authorizedRequest(new ApiRequestDto(`/${userId}`, "PATCH", updateUserDto))
  }

  public async remove(userId: number): Promise<ApiResponseDto<UserRemoveResultDto>> {
    return this.authorizedRequest(new ApiRequestDto(`/${userId}`, "DELETE"))
  }

  public async getUserRoles(userId: number): Promise<ApiResponseDto<RoleDto[]>> {
    return this.authorizedRequest(new ApiRequestDto(`/${userId}/roles`, "GET"))
  }
  
  public async getUserRules(userId: number): Promise<ApiResponseDto<LinkedRuleDto[]>> {
    return this.authorizedRequest(new ApiRequestDto(`/${userId}/rules`, "GET"))
  }
  
  public async appendRules(userId: number, linkedRules: LinkedRuleDto[]): Promise<ApiResponseDto<LinkedRuleDto[]>> {
    return this.authorizedRequest(new ApiRequestDto(`/${userId}/rules`, "POST", linkedRules))
  }

  public async appendRoles(userId: number, roles: number[]): Promise<ApiResponseDto<RoleDto[]>> {
    return this.authorizedRequest(new ApiRequestDto(`/${userId}/rules`, "POST", roles))
  }

  public async removeRulesFromUser(userId: number, linkedRules: LinkedRuleDto[]): Promise<ApiResponseDto<any>> {
    return this.authorizedRequest(new ApiRequestDto(`/${userId}/rules`, "DELETE", linkedRules))
  }
  
  public async removeRolesFromUser(userId: number, roles: number[]): Promise<ApiResponseDto<any>> {
    return this.authorizedRequest(new ApiRequestDto(`/${userId}/roles`, "DELETE", roles))
  }
}