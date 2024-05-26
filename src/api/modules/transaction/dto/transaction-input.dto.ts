import TransactionProductItemDto from "@/api/modules/transaction/dto/transaction-product-item.dto";

export default class TransactionInputDto {
  constructor(
    public to: number | null = null,
    public from: number | null = null,
    public type: number,
    public products: TransactionProductItemDto[] = [],
    public isPaid: boolean | null = null,
    public arrivalDate: number | null = null,
  ) {}
}
