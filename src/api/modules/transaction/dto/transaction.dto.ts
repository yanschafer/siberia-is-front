import TransactionStatusDto from "@/api/modules/transaction/dto/transaction-status.dto";
import TransactionTypeDto from "@/api/modules/transaction/dto/transaction-type.dto";
import TransactionProductItemDto from "@/api/modules/transaction/dto/transaction-product-item.dto";
import StockDto from "@/api/modules/stock/dto/stock.dto";

export default class TransactionDto {
  constructor(
    public id: number,
    public status: TransactionStatusDto,
    public type: TransactionTypeDto,
    public products: TransactionProductItemDto[],
    public from: StockDto,
    public to: StockDto
  ) {
  }
}