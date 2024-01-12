export default class ProductInputDto {
  constructor(
    public photoBase64: string,
    public photoName: string,
    public vendorCode: string,
    public barcode: string,
    public brand: number | null,
    public name: string,
    public description: string,
    public distributorPrice: number,
    public professionalPrice: number,
    public commonPrice: number,
    public category: number | null,
    public collection: number | null,
    public color: string,
    public amountInBox: number,
    public expirationDate: number,
    public link: string
  ) {}
}