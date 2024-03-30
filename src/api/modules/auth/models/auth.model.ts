import AuthInputDto from "@/api/modules/auth/dto/login/auth-input.dto";
import ApiResponseDto from "@/api/dto/api-response.dto";
import TokenPairDto from "@/api/modules/auth/dto/token-pair.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";
import AuthorizedUserDto from "@/api/modules/auth/dto/authorized-user.dto";
import ApiModelUtil from "@/utils/api-model.util";
import TokenUtil from "@/utils/token.util";

export default class AuthModel extends ApiModelUtil {
  constructor() {
    super("/auth");
  }

  public async auth(
    authInputDto: AuthInputDto,
  ): Promise<ApiResponseDto<TokenPairDto>> {
    const tokenPair = await this.unauthorizedRequest<TokenPairDto>(
      new ApiRequestDto("", "POST", authInputDto),
    );
    if (tokenPair.success) {
      TokenUtil.login(tokenPair.getData());
      const authorizedUserDto = await this.getAuthorized();
      TokenUtil.setAuthorized(authorizedUserDto.getData());
    }
    return tokenPair;
  }

  public async getAuthorized(): Promise<ApiResponseDto<AuthorizedUserDto>> {
    return this.authorizedRequest(new ApiRequestDto("/authorized", "GET"));
  }

  private async getBase64(url: string): Promise<string> {
    return await this.plainAuthorizedRequest(new ApiRequestDto(url, "POST"))
      .then((res) => {
        return `data:image/png;base64,${res.data}`;
      })
      .catch((err) => {
        return "";
      });
  }

  public async getStorehouseQr(storehouseId: number): Promise<string> {
    return this.getBase64(`/qr/stock/${storehouseId}`);
  }

  public async getTransactionQr(transactionId: number): Promise<string> {
    return this.getBase64(`/qr/transaction/${transactionId}`);
  }
}
