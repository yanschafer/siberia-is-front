import ApiRequestDto from "@/api/dto/api-request.dto";
import ApiResponseDto from "@/api/dto/api-response.dto";
import HistoryRowDto from "@/api/modules/history/dto/history-row.dto";
import HistorySearchFilterDto from "@/api/modules/history/dto/history-search-filter.dto";
import ApiModelUtil from "@/utils/api-model.util";

export default class HistoryModel extends ApiModelUtil {
  constructor() {
    super("/logs");
  }

  public async getAll(searchFilterDto: HistorySearchFilterDto = new HistorySearchFilterDto()): Promise<ApiResponseDto<HistoryRowDto[]>> {
    return this.authorizedRequest(new ApiRequestDto("", "POST", searchFilterDto))
  }
}