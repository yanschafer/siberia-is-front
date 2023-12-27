export default class ApiErrorDto {
  constructor(
    public httpStatusCode: number,
    public httpStatusText: string,
    public data: string | null
  ) {}
}