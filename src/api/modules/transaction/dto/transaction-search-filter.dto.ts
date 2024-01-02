export default class TransactionSearchFilterDto {
  constructor(
    public status: number[] | null = null,
    public type: number[] | null = null,
    public to: number[] | null = null,
    public from: number[] | null = null
  ) {
  }

}