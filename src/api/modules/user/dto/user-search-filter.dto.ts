export default class UserSearchFilterDto {
  constructor(
    public name: string | null = null,
    public login: string | null = null
  ) {}
}