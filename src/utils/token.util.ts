import TokenPairDto from "@/api/modules/auth/dto/token-pair.dto";
import AuthorizedUserDto from "@/api/modules/auth/dto/authorized-user.dto";

class TokenUtil {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private readonly accessTokenKey = "access";
  private readonly refreshTokenKey = "refresh";
  private readonly authorizedUserKey = "authorized";
  private authorizedUserDto: AuthorizedUserDto | null = null;

  constructor() {
    if (localStorage.getItem(this.authorizedUserKey)) {
      this.loadTokens();
    }
  }

  isAuthorized() {
    return this.accessToken && this.refreshToken;
  }

  getAccess() {
    return this.accessToken;
  }

  getRefresh() {
    return this.refreshToken;
  }

  hasAccessTo(ruleId: number) {
    if (this.authorizedUserDto)
      return (
        this.authorizedUserDto.rules.filter((el) => {
          return el.ruleId == ruleId;
        }).length > 0
      );
    else return false;
  }

  getAuthorizedId() {
    if (this.authorizedUserDto) return this.authorizedUserDto.id;
    else return null;
  }

  loadTokens() {
    if (localStorage.getItem("access")) {
      this.accessToken = localStorage.getItem("access");
    }

    if (localStorage.getItem("refresh")) {
      this.refreshToken = localStorage.getItem("refresh");
    }

    this.authorizedUserDto = JSON.parse(
      localStorage.getItem(this.authorizedUserKey),
    );
  }

  login(tokenPairDto: TokenPairDto) {
    localStorage.setItem(this.accessTokenKey, tokenPairDto.accessToken);
    localStorage.setItem(this.refreshTokenKey, tokenPairDto.refreshToken);
    this.loadTokens();
  }

  setAuthorized(authorizedUserDto: AuthorizedUserDto) {
    localStorage.setItem(
      this.authorizedUserKey,
      JSON.stringify(authorizedUserDto),
    );
    this.authorizedUserDto = authorizedUserDto;
  }

  logout() {
    this.accessToken = this.refreshToken = null;
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.authorizedUserKey);
  }
}

export default new TokenUtil();
