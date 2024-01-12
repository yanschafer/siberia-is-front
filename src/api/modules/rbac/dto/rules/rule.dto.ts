export default class RuleDto {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public needStock: boolean,
  ) {}
}
