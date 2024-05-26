import TransactionModel from "@/api/modules/transaction/models/transaction.model";
import ApiResponseDto from "@/api/dto/api-response.dto";
import ApiRequestDto from "@/api/dto/api-request.dto";
import TransactionProductItemDto from "@/api/modules/transaction/dto/transaction-product-item.dto";

export default class IncomeTransactionModel extends TransactionModel {
  constructor() {
    super("/income");
  }

  async partiallyReceive(
    transactionId: number,
    productsDiff: TransactionProductItemDto[],
  ) {
    return await this.authorizedRequest(
      new ApiRequestDto(`/${transactionId}/partially`, "PATCH", productsDiff),
    );
  }

  // async updateActualAmount(
  //   transactionId: number,
  //   productId: number,
  //   amount: number,
  // ): Promise<ApiResponseDto<any>> {
  //   return await this.authorizedRequest(
  //     new ApiRequestDto(`/${transactionId}/actual`, "PATCH", {
  //       productId,
  //       amount,
  //     }),
  //   );
  // }
}
