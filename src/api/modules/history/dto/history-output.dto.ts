import BrandModel from "@/api/modules/brand/models/brand.model";
import CollectionModel from "@/api/modules/collection/models/collection.model";
import CategoryModel from "@/api/modules/category/models/category.model";
import GalleryModel from "@/api/modules/gallery/models/gallery.model";
import { EventObjectTypes } from "@/api/conf/app.conf";

export default class HistoryOutputDto {
  rollbackDto;
  afterInstance;
  constructor(
    public id: number,
    public author: string,
    public eventTypeId: number,
    public eventType: string,
    public eventObjectType: string,
    public eventObjectTypeId: number,
    public eventObjectName: string,
    public eventObjectId: number,
    public eventDescription: string,
    public timestamp: string,
    private rollbackInstance: string,
    public rollbackRoute: string,
    public canBeReset: boolean,
  ) {}

  static createFromDto({
    id,
    author,
    eventTypeId,
    eventType,
    eventObjectType,
    eventObjectTypeId,
    eventObjectName,
    eventObjectId,
    eventDescription,
    timestamp,
    rollbackInstance,
    rollbackRoute,
    canBeReset,
  }) {
    return new HistoryOutputDto(
      id,
      author,
      eventTypeId,
      eventType,
      eventObjectType,
      eventObjectTypeId,
      eventObjectName,
      eventObjectId,
      eventDescription,
      timestamp,
      rollbackInstance,
      rollbackRoute,
      canBeReset,
    );
  }

  init() {
    const { rollbackInstance, afterInstance } = JSON.parse(
      this.rollbackInstance,
    );
    this.rollbackDto = rollbackInstance;
    this.afterInstance = afterInstance;
  }

  private keyToLoader = {
    brand: async (id) => {
      const brandModel = new BrandModel();
      const brand = await brandModel.getOne(id);
      if (brand.success) {
        return brand.getData().name;
      }
      return null;
    },
    collection: async (id) => {
      const collectionModel = new CollectionModel();
      const brand = await collectionModel.getOne(id);
      if (brand.success) {
        return brand.getData().name;
      }
      return null;
    },
    category: async (id) => {
      const categoryModel = new CategoryModel();
      const brand = await categoryModel.getOne(id);
      if (brand.success) {
        return brand.getData().name;
      }
      return null;
    },
    photo: async (data) => {
      const galleryModel = new GalleryModel();
      const loaded = await galleryModel.getPaths(data);
      if (loaded.success) {
        return loaded.getData();
      }
      return null;
    },
  };

  private async loadSubModel(key: string, data: number | number[]) {
    return await this.keyToLoader[key](data);
  }

  //For update requests
  public async getBeforeAfterObject(
    translator = (data) => data,
  ): Promise<Record<string, { before: any; after: any }>[]> {
    const beforeAfterObject = {};
    const specialKeys = Object.keys(this.keyToLoader);
    const beforeObject = translator(this.rollbackDto);
    await Promise.all(
      Object.keys(beforeObject).map(async (field) => {
        let key = field;
        if (
          this.eventObjectTypeId == EventObjectTypes.CATEGORY &&
          field == "parent"
        ) {
          key = "category";
        }
        const before = specialKeys.includes(key)
          ? await this.loadSubModel(key, beforeObject[field])
          : beforeObject[field];

        const after = specialKeys.includes(key)
          ? await this.loadSubModel(key, this.afterInstance[field])
          : this.afterInstance[field];

        beforeAfterObject[field] = {
          before,
          after: after ?? "",
        };
      }),
    );

    return beforeAfterObject;
  }

  //For remove requests
  public async getBeforeObject(
    translator = (data) => data,
  ): Promise<Record<string, { before: any; after: string }>[]> {
    const beforeAfterObject = {};
    const specialKeys = Object.keys(this.keyToLoader);
    const beforeObject = translator(this.rollbackDto);
    await Promise.all(
      Object.keys(beforeObject).map(async (field) => {
        let key = field;
        if (
          this.eventObjectTypeId == EventObjectTypes.CATEGORY &&
          field == "parent"
        ) {
          key = "category";
        }

        const before = specialKeys.includes(key)
          ? await this.loadSubModel(key, beforeObject[field])
          : beforeObject[field];

        beforeAfterObject[field] = {
          before,
          after: "-",
        };
      }),
    );

    return beforeAfterObject;
  }

  //For remove requests
  public async getAfterObject(
    translator = (data) => data,
  ): Promise<Record<string, { before: any; after: string }>[]> {
    const beforeAfterObject = {};
    const specialKeys = Object.keys(this.keyToLoader);
    const afterObject = translator(this.rollbackDto);
    await Promise.all(
      Object.keys(afterObject).map(async (field) => {
        const after = specialKeys.includes(field)
          ? await this.loadSubModel(field, afterObject[field])
          : afterObject[field];
        beforeAfterObject[field] = {
          before: "-",
          after,
        };
      }),
    );

    return beforeAfterObject;
  }
}
