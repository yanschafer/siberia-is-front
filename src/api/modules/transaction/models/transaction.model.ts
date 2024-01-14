import TransactionInputDto from "@/api/modules/transaction/dto/transaction-input.dto";
import ApiResponseDto from "@/api/dto/api-response.dto";
import TransactionSimpleDto from "@/api/modules/transaction/dto/transaction-simple.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";
import TransactionListItemDto from "@/api/modules/transaction/dto/transaction-list-item.dto";
import TransactionDto from "@/api/modules/transaction/dto/transaction.dto";
import ApiModelUtil from "@/utils/api-model.util";
import TransactionSearchFilterDto from "@/api/modules/transaction/dto/transaction-search-filter.dto";
import TransactionStatusDto from "@/api/modules/transaction/dto/transaction-status.dto";

export default class TransactionModel extends ApiModelUtil {
  constructor(baseUrl: string = "") {
    super(`/transaction${baseUrl}`);
  }

  public async getAvailableFiltered(
    searchFilterDto: TransactionSearchFilterDto = new TransactionSearchFilterDto(),
  ): Promise<ApiResponseDto<TransactionListItemDto[]>> {
    return this.authorizedRequest(
      new ApiRequestDto("", "POST", searchFilterDto),
    );
  }

  public async getOne(
    transactionId: number,
  ): Promise<ApiResponseDto<TransactionDto>> {
    return this.authorizedRequest(
      new ApiRequestDto(`/${transactionId}`, "GET"),
    );
  }

  public async create(
    transactionInputDto: TransactionInputDto,
  ): Promise<ApiResponseDto<TransactionSimpleDto>> {
    return this.authorizedRequest(
      new ApiRequestDto("", "POST", transactionInputDto),
    );
  }

  public async approve(
    transactionId: number,
  ): Promise<ApiResponseDto<TransactionSimpleDto>> {
    return this.authorizedRequest(
      new ApiRequestDto(`/${transactionId}/approve`, "PATCH", null),
    );
  }

  public async cancel(
    transactionId: number,
  ): Promise<ApiResponseDto<TransactionSimpleDto>> {
    return this.authorizedRequest(
      new ApiRequestDto(`/${transactionId}/cancel`, "PATCH", null),
    );
  }

  public async changeStatus(
    transactionId: number,
    statusId: number,
  ): Promise<ApiResponseDto<TransactionSimpleDto>> {
    return this.authorizedRequest(
      new ApiRequestDto(`/${transactionId}/${statusId}`, "PATCH"),
    );
  }

  public async getAllStatuses(): Promise<
    ApiResponseDto<TransactionStatusDto[]>
  > {
    return this.authorizedRequest(new ApiRequestDto("/statuses", "GET"));
  }
}
