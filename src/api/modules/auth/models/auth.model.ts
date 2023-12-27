import ApiModelUtil from "@/api/utils/api-model.util";
import AuthInputDto from "@/api/modules/auth/dto/login/auth-input.dto";
import ApiResponseDto from "@/api/dto/api-response.dto";
import TokenPairDto from "@/api/modules/auth/dto/token-pair.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";
import AuthorizedUserDto from "@/api/modules/auth/dto/authorized-user.dto";
import TokenUtil from "@/api/utils/token.util";

export default class AuthModel extends ApiModelUtil {
  constructor() {
    super("/auth");
  }

  public async auth(authInputDto: AuthInputDto): Promise<ApiResponseDto<TokenPairDto>> {
    const tokenPair = await this.unauthorizedRequest<TokenPairDto>(new ApiRequestDto("", "POST", authInputDto))

    if (tokenPair.success)
      TokenUtil.login(tokenPair.getData())
    return tokenPair
  }

  public async getAuthorized(): Promise<ApiResponseDto<AuthorizedUserDto>> {
    return this.unauthorizedRequest(new ApiRequestDto("/authorized", "GET"))
  }
}