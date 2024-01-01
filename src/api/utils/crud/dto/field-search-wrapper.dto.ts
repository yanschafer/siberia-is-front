export default class FieldSearchWrapperDto {
  constructor(
    public specificValue: number | null,
    public topBound: number | null,
    public bottomBound: number | null
  ) {
  }
}