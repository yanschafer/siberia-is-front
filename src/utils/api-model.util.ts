import ApiResponseDto from "@/api/dto/api-response.dto";
import axios, {AxiosError} from "axios";
import {appConf} from "@/api/conf/app.conf";
import ApiRequestDto from "@/api/dto/api-request.dto";
import TokenPairDto from "@/api/modules/auth/dto/token-pair.dto";
import TokenUtil from "@/utils/token.util";
import LoggerUtil from "@/utils/logger/logger.util";
import AuthorizedUserDto from "@/api/modules/auth/dto/authorized-user.dto";
import {useRouter} from "vue-router";

export default class ApiModelUtil {
  constructor(private baseEndpoint: string) {}

  private baseEndpointBuffer = ""

  private onRefresh: ApiRequestDto | null = null

  private buildUrl(endpoint: string): string {
    const baseUrl = `${appConf.endpoint}${this.baseEndpoint}${endpoint}`.replace("//", "/").replace("//", "/")

    return `${appConf.proto}://${baseUrl}`
  }

  private buildHeaders(token: string | null = null) {
    return {
      "Content-Type": "application/json",
      ...(token ? {"Authorization": `Bearer ${token}`} : {})
    }
  }

  private buildRequestOptions(request: ApiRequestDto): ApiRequestDto {
    return new ApiRequestDto(
      this.buildUrl(request.url), request.method, request.data
    )
  }

  async refresh(): Promise<ApiResponseDto<TokenPairDto>> {
    const refreshToken = TokenUtil.getRefresh()
    this.baseEndpointBuffer = this.baseEndpoint
    this.baseEndpoint = ""
    return await axios<TokenPairDto>({
      url: this.buildUrl(appConf.refreshEndpoint),
      method: "POST",
      data: null,
      headers: {
        ...this.buildHeaders(refreshToken)
      }
    })
      .then((res: axios.AxiosResponse) => this.processSuccessResponse<TokenPairDto>(res))
      .catch((err: AxiosError) => this.processFailedResponse<TokenPairDto>(null, false, err))
  }

  private async refreshAccessAndExecute <T> (): Promise<ApiResponseDto<T>> {
    const refreshResult = await this.refresh()
    if (refreshResult && refreshResult.success && this.onRefresh) {
      TokenUtil.login(refreshResult.getData())
      const authorizedUserDto = await this.authorizedRequest<AuthorizedUserDto>(new ApiRequestDto("/auth/authorized", "GET"))
      TokenUtil.setAuthorized(authorizedUserDto.getData())
      LoggerUtil.debugPrefixed("API_MODEL", "Refresh succeed.",)
      this.baseEndpoint = this.baseEndpointBuffer
      const afterRefresh = await this.authorizedRequest(this.onRefresh)
      this.onRefresh = null;
      return afterRefresh
    }
    else {
      LoggerUtil.debugPrefixed("API_MODEL", "Refresh failed with: ", refreshResult)
      TokenUtil.logout()
      window.location = "/login"
      return new ApiResponseDto<T>(false, null, refreshResult.getError())
    }
  }

  private processSuccessResponse <T> (response: axios.AxiosResponse): ApiResponseDto<T> {
    LoggerUtil.debugPrefixed("API_MODEL", "Request successfully proceed, with response: ", response)
    return ApiResponseDto.successResponse<T>(response)
  }

  private async processFailedResponse <T> (request: ApiRequestDto | null, authorized: boolean, error: AxiosError): Promise<ApiResponseDto<T>> {
    LoggerUtil.debugPrefixed("API_MODEL", "Request", request, "failed with error: ", error)
    if (error.code === "ERR_NETWORK")
      return ApiResponseDto.networkError()

    const result = ApiResponseDto.buildFromError(error)
    if (authorized && request && result.getError().httpStatusCode == 401 && this.onRefresh == null) {
      LoggerUtil.debugPrefixed("API_MODEL", "Start refreshing")
      this.onRefresh = request
      return await this.refreshAccessAndExecute()
    }
    return result
  }


  async unauthorizedRequest<T>(request: ApiRequestDto): Promise<ApiResponseDto<T>> {
    const requestOptions = this.buildRequestOptions(request)
    LoggerUtil.debugPrefixed("API_MODEL", "New request executed", requestOptions)
    const result: Promise<ApiResponseDto<T>> = axios<T>({
      ...requestOptions,
      headers: {
        ...this.buildHeaders()
      }
    })
      .then((res: axios.AxiosResponse<T>) => this.processSuccessResponse<T>(res))
      .catch((err: AxiosError) => this.processFailedResponse<T>(request, false, err))

    return await result;
  }

  async authorizedRequest<T>(request: ApiRequestDto): Promise<ApiResponseDto<T>> {
    const requestOptions = this.buildRequestOptions(request)
    LoggerUtil.debugPrefixed("API_MODEL", "New request executed", requestOptions)
    const accessToken = TokenUtil.getAccess()
    // console.log(accessToken)
    const result: Promise<ApiResponseDto<T>> = axios<T>({
      ...requestOptions,
      headers: {
        ...this.buildHeaders(accessToken)
      }
    })
      .then((res: axios.AxiosResponse<T>) => this.processSuccessResponse<T>(res))
      .catch((err: AxiosError) => this.processFailedResponse<T>(request, true, err))

    return await result;
  }
}
