import {serverConf} from "@/api/conf/server.conf";

class FilesResolverUtil {
  getStreamUrl(fileName: string): string {
    return `${serverConf.proto}://${serverConf.endpoint}/file/stream/${fileName}`
  }
}

export default (new FilesResolverUtil())