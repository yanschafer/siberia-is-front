export default class MassiveUpdateDto {
  constructor(
    public brand: number | null, //+
    public distributorPercent: number | null, //+
    public professionalPercent: number | null, //+
    public commonPrice: number | null, //+
    public category: number | null, //+
    public collection: number | null, //+
    public color: string | null, //+
    public amountInBox: number | null, //+
    public expirationDate: number | null, //+
  ) {}
}
