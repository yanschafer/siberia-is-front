import ApiRequestDto from "@/api/dto/api-request.dto";
import ApiResponseDto from "@/api/dto/api-response.dto";
import HistoryRowDto from "@/api/modules/history/dto/history-row.dto";
import HistorySearchFilterDto from "@/api/modules/history/dto/history-search-filter.dto";
import ApiModelUtil from "@/utils/api-model.util";
import HistoryEventTypeDto from "@/api/modules/history/dto/history-event-type.dto";
import HistoryEventObjectTypeDto from "@/api/modules/history/dto/history-event-object-type.dto";
import HistoryOutputDto from "@/api/modules/history/dto/history-output.dto";

export default class RollbackModel extends ApiModelUtil {
  constructor() {
    super("/");
  }

  rollback(historyOutputDto: HistoryOutputDto): Promise<ApiResponseDto<any>> {
    return this.authorizedRequest(
      new ApiRequestDto(
        `/${historyOutputDto.rollbackRoute}/rollback/${historyOutputDto.id}`,
        "POST",
      ),
    );
  }
}
