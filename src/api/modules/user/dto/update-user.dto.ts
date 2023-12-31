export default class UpdateUserDto {
  constructor(
    public name: string | null = null,
    public login: string | null = null,
    public password: string | null = null,
  ) {}
}