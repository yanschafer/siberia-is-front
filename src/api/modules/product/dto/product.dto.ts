import BrandDto from "@/api/modules/brand/dto/brand.dto";
import CategoryDto from "@/api/modules/category/dto/category.dto";
import CollectionDto from "@/api/modules/collection/dto/collection.dto";

export default class ProductDto {
  constructor(
    public id: number,
    public photo: string[],
    public photoIds: number[],
    public vendorCode: string,
    public barcode: string,
    public eanCode: string,
    public brand: BrandDto | null,
    public name: string,
    public description: string,
    public lastPurchasePrice: number,
    public cost: number | null,
    public lastPurchaseDate: number | null,
    public distributorPrice: number,
    public distributorPercent: number,
    public professionalPrice: number,
    public professionalPercent: number,
    public commonPrice: number,
    public offertaPrice: number,
    public category: CategoryDto | null,
    public collection: CollectionDto | null,
    public color: string,
    public amountInBox: number,
    public expirationDate: number,
    public link: string,
  ) {}
}
