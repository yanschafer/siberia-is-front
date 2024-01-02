export default class TransactionSimpleDto {
  constructor(
    public id: number,
    public status: number,
    public type: number,
    public from: number,
    public to: number
  ) {
  }
}