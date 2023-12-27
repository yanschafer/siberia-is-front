import ApiResponseDto from "@/api/dto/api-response.dto";
import axios from "axios";
import {AxiosError} from "axios";
import {serverConf} from "@/api/conf/server.conf";
import TokenUtil from "@/api/utils/token.util";
import ApiRequestDto from "@/api/dto/api-request.dto";
import TokenPairDto from "@/api/modules/auth/dto/token-pair.dto";

export default class ApiModelUtil {
  constructor(private baseEndpoint: string) {}

  private onRefresh: ApiRequestDto | null = null

  private buildUrl(endpoint: string): string {
    const baseUrl = `${serverConf.endpoint}/${this.baseEndpoint}/${endpoint}`.replace("//", "/").replace("//", "/")

    return `${serverConf.proto}://${baseUrl}`
  }

  private buildHeaders(token: string | null = null) {
    return {
      "Content-Type": "application/json",
      ...(token ? {"Authorization": `Bearer ${token}`} : {})
    }
  }

  private buildRequestOptions(request: ApiRequestDto) {
    return {
      url: this.buildUrl(request.endpoint),
      method: request.method,
      data: request.data,
    }
  }

  private async refreshAccessAndExecute <T> (): Promise<ApiResponseDto<T>> {
    const refreshToken = TokenUtil.getRefresh()
    const refreshResult: ApiResponseDto<TokenPairDto> = await axios<TokenPairDto>({
      url: this.buildUrl(serverConf.refreshEndpoint),
      method: "POST",
      data: null,
      headers: {
        ...this.buildHeaders(refreshToken)
      }
    })
      .then((res: axios.AxiosResponse) => this.processSuccessResponse<TokenPairDto>(res))
      .catch((err: AxiosError) => this.processFailedResponse<TokenPairDto>(null, false, err))

    if (refreshResult && refreshResult.success && this.onRefresh) {
      TokenUtil.login(refreshResult.getData())
      return this.authorizedRequest(this.onRefresh)
    }
    else {
      return new ApiResponseDto<T>(false, null, refreshResult.getError())
    }
  }

  private processSuccessResponse <T> (response: axios.AxiosResponse): ApiResponseDto<T> {
    return ApiResponseDto.successResponse<T>(response)
  }

  private async processFailedResponse <T> (request: ApiRequestDto | null, authorized: boolean, error: AxiosError): Promise<ApiResponseDto<T>> {
    if (error.code === "ERR_NETWORK")
      return ApiResponseDto.networkError()

    const result = ApiResponseDto.buildFromError(error)
    if (authorized && request && result.getError().httpStatusCode == 401) {
      this.onRefresh = request
      return await this.refreshAccessAndExecute()
    }
    return result
  }


  async unauthorizedRequest<T>(request: ApiRequestDto): Promise<ApiResponseDto<T>> {
    const result: Promise<ApiResponseDto<T>> = axios<T>({
      ...this.buildRequestOptions(request),
      headers: {
        ...this.buildHeaders()
      }
    })
      .then((res: axios.AxiosResponse<T>) => this.processSuccessResponse<T>(res))
      .catch((err: AxiosError) => this.processFailedResponse<T>(request, false, err))

    return await result;
  }

  async authorizedRequest<T>(request: ApiRequestDto): Promise<ApiResponseDto<T>> {
    const accessToken = TokenUtil.getAccess()
    // console.log(accessToken)
    const result: Promise<ApiResponseDto<T>> = axios<T>({
      ...this.buildRequestOptions(request),
      headers: {
        ...this.buildHeaders(accessToken)
      }
    })
      .then((res: axios.AxiosResponse<T>) => this.processSuccessResponse<T>(res))
      .catch((err: AxiosError) => this.processFailedResponse<T>(request, true, err))

    return await result;
  }
}
