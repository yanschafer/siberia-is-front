export class StockSearchDto {
  constructor(
    public name: string | null = null,
    public address: string | null = null
  ) {
  }
}


export default class StockSearchFilterDto {
  constructor(
    public filters: StockSearchDto
  ) {
  }
}