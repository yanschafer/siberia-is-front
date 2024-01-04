export default class NotificationSearchFilterDto {
  constructor(
    public isNew: boolean | null = null,
    public type: number[] | null = null,
    public domain: number[] | null = null,
    public description: string | null = null
  ) {
  }
}