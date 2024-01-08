import {appConf} from "@/api/conf/app.conf";
import {LogLevel} from "@/utils/logger/log-level";

class LoggerUtil {
  private readonly level: LogLevel
  private readonly excludedPrefixes: string[]

  constructor() {
    this.level = appConf.loggerLevel
    this.excludedPrefixes = appConf.loggerExcludedPrefixes
  }

  public log(mode: LogLevel, prefix: string, ...message: any[]) {
    if (this.excludedPrefixes.includes(prefix) || this.excludedPrefixes.includes("*"))
      return
    if (this.level < mode)
      return

    console.log("LOG: ", prefix)
    message[0].forEach(el => console.log(el))
    console.log("------------------")
  }

  public debug(...message: any[]) {
    this.log(LogLevel.DEBUG, "", message)
  }

  public debugPrefixed(prefix: string = "default", ...message: any[]) {
    this.log(LogLevel.DEBUG, prefix, message)
  }

  public info(...message: any[]) {
    this.log(LogLevel.INFO, "", message)
  }

  public infoPrefixed(prefix: string = "default", ...message: any[]) {
    this.log(LogLevel.INFO, prefix, message)
  }
}

export default new LoggerUtil()