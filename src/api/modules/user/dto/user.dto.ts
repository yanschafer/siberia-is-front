export default class UserDto {
  constructor(
    public id: number,
    public name: string,
    public login: string,
    public lastLogin: number
  ) {}
}
