export default class ProductUpdateDto {
  constructor(
    public photo: number[] | null,
    public vendorCode: string | null,
    public eanCode: string | null,
    public barcode: string | null,
    public brand: number | null,
    public name: string | null,
    public description: string | null,
    public distributorPercent: number | null,
    public professionalPercent: number | null,
    public commonPrice: number | null,
    public offertaPrice: number | null,
    public category: number | null,
    public collection: number | null,
    public color: string | null,
    public amountInBox: number | null,
    public expirationDate: number | null,
    public link: string | null,
  ) {}
}
