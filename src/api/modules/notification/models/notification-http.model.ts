import ApiModelUtil from "@/api/utils/api-model.util";
import NotificationSearchFilterDto from "@/api/modules/notification/dto/notification-search-filter.dto";
import ApiResponseDto from "@/api/dto/api-response.dto";
import NotificationDto from "@/api/modules/notification/dto/notification.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";
import NotificationWatchResultDto from "@/api/modules/notification/dto/notification-watch-result.dto";

export default class NotificationHttpModel extends ApiModelUtil {
  constructor() {
    super("/notification");
  }

  public async getAll(searchFilterDto: NotificationSearchFilterDto): Promise<ApiResponseDto<NotificationDto[]>> {
    return await this.authorizedRequest(new ApiRequestDto("/all", "POST", searchFilterDto))
  }
  
  public async markAsWatched(onWatch: number[]): Promise<ApiResponseDto<NotificationWatchResultDto>> {
    return await this.authorizedRequest(new ApiRequestDto("/watch", "POST", onWatch))
  }
}