import TokenPairDto from "@/api/modules/auth/dto/token-pair.dto";

class TokenUtil {
  private accessToken: string | null = null
  private refreshToken: string | null = null
  private accessTokenKey = "access"
  private refreshTokenKey = "refresh"

  constructor() {
    this.loadTokens()
  }

  isAuthorized() {
    return this.accessToken && this.refreshToken
  }

  getAccess() {
    return this.accessToken
  }

  getRefresh() {
    return this.refreshToken
  }

  loadTokens() {
    if (localStorage.getItem("access")) {
      this.accessToken = localStorage.getItem("access")
    }

    if (localStorage.getItem("refresh")) {
      this.refreshToken = localStorage.getItem("refresh")
    }
  }

  login(tokenPairDto: TokenPairDto) {
    localStorage.setItem(this.accessTokenKey, tokenPairDto.accessToken)
    localStorage.setItem(this.refreshTokenKey, tokenPairDto.refreshToken)
    this.loadTokens()
  }


  logout() {
    this.accessToken = this.refreshToken = null
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
  }
}

export default new TokenUtil()