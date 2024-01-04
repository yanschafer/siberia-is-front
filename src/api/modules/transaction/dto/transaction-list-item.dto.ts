import TransactionStatusDto from "@/api/modules/transaction/dto/transaction-status.dto";
import TransactionTypeDto from "@/api/modules/transaction/dto/transaction-type.dto";

export default class TransactionListItemDto {
  constructor(
    public id: number,
    public from: number,
    public fromName: string,
    public to: number,
    public toName: string,
    public status: TransactionStatusDto,
    public type: TransactionTypeDto
  ) {
  }
}