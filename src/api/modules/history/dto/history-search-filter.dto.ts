export default class HistorySearchFilterDto {
  constructor(
    public author: string | null = null,
    public rangeStart: number | null = null,
    public rangeEnd: number | null = null,
    public eventTypeId: number[] | null = null,
    public eventObjectTypeId: number[] | null = null
  ) {
  }
}