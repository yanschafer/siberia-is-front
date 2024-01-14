import ApiRequestDto from "@/api/dto/api-request.dto";
import ApiResponseDto from "@/api/dto/api-response.dto";
import HistoryRowDto from "@/api/modules/history/dto/history-row.dto";
import HistorySearchFilterDto from "@/api/modules/history/dto/history-search-filter.dto";
import ApiModelUtil from "@/utils/api-model.util";
import HistoryEventTypeDto from "@/api/modules/history/dto/history-event-type.dto";
import HistoryEventObjectTypeDto from "@/api/modules/history/dto/history-event-object-type.dto";

export default class HistoryModel extends ApiModelUtil {
  constructor() {
    super("/logs");
  }

  public async getAll(
    searchFilterDto: HistorySearchFilterDto = new HistorySearchFilterDto(),
  ): Promise<ApiResponseDto<HistoryRowDto[]>> {
    return this.authorizedRequest(
      new ApiRequestDto("", "POST", searchFilterDto),
    );
  }

  public async getAllTypes(): Promise<ApiResponseDto<HistoryEventTypeDto[]>> {
    return this.authorizedRequest(new ApiRequestDto("/types", "GET"));
  }

  public async getAllObjectTypes(): Promise<
    ApiResponseDto<HistoryEventObjectTypeDto[]>
  > {
    return this.authorizedRequest(new ApiRequestDto("/object/types", "GET"));
  }
}
