export default class CategoryUpdateDto {
  constructor(
    public name: string | null,
    public parent: number | null
  ) {}
}