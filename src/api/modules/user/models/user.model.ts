import ApiModelUtil from "@/api/utils/api-model.util";
import ApiResponseDto from "@/api/dto/api-response.dto";
import UserDto from "@/api/modules/user/dto/user.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";
import LinkedRuleDto from "@/api/modules/auth/dto/rules/linked-rule.dto";
import UserSearchFilterDto from "@/api/modules/user/dto/user-search-filter.dto";
import CreateUserDto from "@/api/modules/user/dto/create-user.dto";

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

  public async create(createUserDto: CreateUserDto): Promise<ApiResponseDto<UserDto>> {
    return this.authorizedRequest(new ApiRequestDto("", "POST", createUserDto))
  }
}