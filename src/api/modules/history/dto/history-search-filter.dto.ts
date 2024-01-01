export default class HistorySearchFilterDto {
  constructor(
    public author: string | null,
    public rangeStart: number | null,
    public rangeEnd: number | null,
    public eventTypeId: number[] | null,
    public eventObjectTypeId: number[] | null
  ) {
  }
}