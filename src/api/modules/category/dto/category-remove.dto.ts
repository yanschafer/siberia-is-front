export default class CategoryRemoveDto {
  constructor(
    public removeChildren: boolean | null,
    public transferChildrenTo: number | null
  ) {
  }
}