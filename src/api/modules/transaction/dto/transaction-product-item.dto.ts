export default class TransactionProductItemDto {
  constructor(
    public productId: number,
    public amount: number,
    public price: number | null = null
  ) {
  }
}