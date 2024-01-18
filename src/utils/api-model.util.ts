import ApiResponseDto from "@/api/dto/api-response.dto";
import axios, { AxiosError } from "axios";
import { appConf } from "@/api/conf/app.conf";
import ApiRequestDto from "@/api/dto/api-request.dto";
import TokenPairDto from "@/api/modules/auth/dto/token-pair.dto";
import TokenUtil from "@/utils/token.util";
import LoggerUtil from "@/utils/logger/logger.util";
import AuthorizedUserDto from "@/api/modules/auth/dto/authorized-user.dto";
import { useRoute, useRouter } from "vue-router";
import loggerUtil from "@/utils/logger/logger.util";
import NotificationSocketModel from "@/api/modules/notification/models/notification-socket.model";
import { useAuthCheckStore } from "@/stores/auth-check.store";
import router from "@/router/index";
import printUtil from "@/utils/localization/print.util";

export default class ApiModelUtil {
  constructor(private baseEndpoint: string) {}

  private baseEndpointBuffer = "";

  private onRefresh: ApiRequestDto | null = null;

  private buildUrl(endpoint: string): string {
    const baseUrl = `${appConf.endpoint}${this.baseEndpoint}${endpoint}`
      .replace("//", "/")
      .replace("//", "/");

    return `${appConf.proto}://${baseUrl}`;
  }

  private buildHeaders(token: string | null = null) {
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  private buildRequestOptions(request: ApiRequestDto): ApiRequestDto {
    return new ApiRequestDto(
      this.buildUrl(request.url),
      request.method,
      request.data,
    );
  }

  async refresh(): Promise<ApiResponseDto<TokenPairDto>> {
    const refreshToken = TokenUtil.getRefresh();
    this.baseEndpointBuffer = this.baseEndpoint;
    this.baseEndpoint = "";
    const res = await axios<TokenPairDto>({
      url: this.buildUrl(appConf.refreshEndpoint),
      method: "POST",
      data: null,
      headers: {
        ...this.buildHeaders(refreshToken),
      },
    })
      .then((res: axios.AxiosResponse) =>
        this.processSuccessResponse<TokenPairDto>(res),
      )
      .catch((err: AxiosError) =>
        this.processFailedResponse<TokenPairDto>(null, false, err),
      );
    if (res.success) {
      TokenUtil.login(res.getData());
      const authorizedUserDto = await this.authorizedRequest<AuthorizedUserDto>(
        new ApiRequestDto("/auth/authorized", "GET"),
      );
      TokenUtil.setAuthorized(authorizedUserDto.getData());
      LoggerUtil.debugPrefixed("API_MODEL", "Refresh succeed.");
    }
    return res;
  }

  private async refreshAccessAndExecute<T>(): Promise<ApiResponseDto<T>> {
    const refreshResult = await this.refresh();
    if (refreshResult && refreshResult.success && this.onRefresh) {
      this.baseEndpoint = this.baseEndpointBuffer;
      const afterRefresh = await this.authorizedRequest(this.onRefresh);
      this.onRefresh = null;
      return afterRefresh;
    } else {
      LoggerUtil.debugPrefixed(
        "API_MODEL",
        "Refresh failed with: ",
        refreshResult,
      );
      TokenUtil.logout();
      // window.location = "/login";
      return new ApiResponseDto<T>(false, null, refreshResult.getError());
    }
  }

  private processSuccessResponse<T>(
    response: axios.AxiosResponse,
  ): ApiResponseDto<T> {
    LoggerUtil.debugPrefixed(
      "API_MODEL",
      "Request successfully proceed, with response: ",
      response,
    );
    return ApiResponseDto.successResponse<T>(response);
  }

  private async processFailedResponse<T>(
    request: ApiRequestDto | null,
    authorized: boolean,
    error: AxiosError,
  ): Promise<ApiResponseDto<T>> {
    LoggerUtil.debugPrefixed(
      "API_MODEL",
      "Request",
      request,
      "failed with error: ",
      error,
    );
    if (error.code === "ERR_NETWORK") return ApiResponseDto.networkError();

    const result = ApiResponseDto.buildFromError(error);
    if (
      authorized &&
      request &&
      result.getError().httpStatusCode == 401 &&
      this.onRefresh == null
    ) {
      LoggerUtil.debugPrefixed("API_MODEL", "Start refreshing");
      this.onRefresh = request;
      return await this.refreshAccessAndExecute();
    }
    return result;
  }

  async unauthorizedRequest<T>(
    request: ApiRequestDto,
  ): Promise<ApiResponseDto<T>> {
    const requestOptions = this.buildRequestOptions(request);
    LoggerUtil.debugPrefixed(
      "API_MODEL",
      "New request executed",
      requestOptions,
    );
    const result: Promise<ApiResponseDto<T>> = axios<T>({
      ...requestOptions,
      headers: {
        ...this.buildHeaders(),
      },
    })
      .then((res: axios.AxiosResponse<T>) =>
        this.processSuccessResponse<T>(res),
      )
      .catch((err: AxiosError) =>
        this.processFailedResponse<T>(request, false, err),
      );

    return await result;
  }

  async authorizedRequest<T>(
    request: ApiRequestDto,
  ): Promise<ApiResponseDto<T>> {
    const requestOptions = this.buildRequestOptions(request);
    LoggerUtil.debugPrefixed(
      "API_MODEL",
      "New request executed",
      requestOptions,
    );
    const accessToken = TokenUtil.getAccess();
    // console.log(accessToken)
    const result: Promise<ApiResponseDto<T>> = axios<T>({
      ...requestOptions,
      headers: {
        ...this.buildHeaders(accessToken),
      },
    })
      .then((res: axios.AxiosResponse<T>) =>
        this.processSuccessResponse<T>(res),
      )
      .catch((err: AxiosError) =>
        this.processFailedResponse<T>(request, true, err),
      );

    return await result;
  }

  initSockets(toast) {
    NotificationSocketModel.setNewRulesUpdateCallback(async () => {
      if (toast) {
        toast.add({
          severity: "info",
          summary: printUtil.localize("rulesUpdated", "utils"),
          detail: printUtil.localize("yourRulesWereUpdated", "utils"),
          life: 3000,
        });
      }
      loggerUtil.debugPrefixed(
        "WebSocket",
        "Start processing update-rules event",
      );
      const authCheckStore = useAuthCheckStore();
      await new ApiModelUtil("").refresh();
      const route = router.currentRoute._value;
      if (route && route.meta && route.meta.ruleId) {
        if (
          !route.meta.ruleId.some((el) =>
            TokenUtil.hasAccessTo(parseInt(el.toString())),
          )
        ) {
          router.push({ name: "dashboard" });
        }
        if (route.name == "Storehouse") {
          if (route.params && route.params.id) {
            if (!TokenUtil.hasAnyAccessToStock(route.params.id))
              router.push({ name: "storehouses" });
          }
        }
      }
      authCheckStore.refresh();
    });
    NotificationSocketModel.init();
  }
}
