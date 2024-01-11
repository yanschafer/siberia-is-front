import BrandDto from "@/api/modules/brand/dto/brand.dto";
import CategoryDto from "@/api/modules/category/dto/category.dto";
import CollectionDto from "@/api/modules/collection/dto/collection.dto";

export default class ProductDto {
  constructor(
    public id: number,
    public photo: string,
    public vendorCode: string,
    public barcode: string,
    public brand: BrandDto | null,
    public name: string,
    public description: string,
    public lastPurchasePrice: number,
    public cost: number | null,
    public lastPurchaseDate: number | null,
    public distributorPrice: number,
    public professionalPrice: number,
    public commonPrice: number,
    public category: CategoryDto | null,
    public collection: CollectionDto | null,
    public color: string,
    public amountInBox: number,
    public expirationDate: number,
    public link: string
  ) {
  }
}