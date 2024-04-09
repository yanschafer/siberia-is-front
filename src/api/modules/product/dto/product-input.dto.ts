export default class ProductInputDto {
  constructor(
    public photoList: number[],
    public vendorCode: string,
    public eanCode: string,
    public barcode: string,
    public brand: number | null,
    public name: string,
    public description: string,
    public distributorPercent: number,
    public professionalPercent: number,
    public commonPrice: number,
    public offertaPrice: number,
    public category: number | null,
    public collection: number | null,
    public color: string,
    public amountInBox: number,
    public expirationDate: number,
    public link: string,
  ) {}
}
