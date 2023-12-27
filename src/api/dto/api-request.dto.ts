export default class ApiRequestDto {
  constructor(
    public endpoint: string,
    public method: string,
    public data: any | null = null
  ) {}
}