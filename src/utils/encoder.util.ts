class EncoderUtil {
  public async encode(file: File): Promise<string | null> {
    const encoded = await new Promise<string | null>(async (resolve, _) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => resolve(null);
    });

    if (encoded == null) return null;
    return this.removeHeader(encoded);
  }

  private removeHeader(encoded: string): string {
    const dataPart = encoded.split("base64")[1];
    return dataPart.substring(1, dataPart.length);
  }
}

export default new EncoderUtil();
