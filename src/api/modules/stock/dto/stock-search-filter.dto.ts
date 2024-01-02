export class StockSearchDto {
  constructor(
    public name: string,
    public address: string
  ) {
  }
}


export default class StockSearchFilterDto {
  constructor(
    public filters: StockSearchDto
  ) {
  }
}