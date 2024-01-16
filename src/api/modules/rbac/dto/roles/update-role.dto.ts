export default class UpdateRoleDto {
  constructor(
    public name: string | null = null,
    public description: string | null = null,
  ) {}
}
