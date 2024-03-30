import { defineStore } from "pinia";
import PrintUtil from "@/utils/localization/print.util";
import ProductGroupModel from "@/api/modules/product/models/product-group.model";
import ProductGroupDto from "@/api/modules/product/dto/groups/product-group.dto";
import ProductGroupUpdateDto from "@/api/modules/product/dto/groups/product-group-update.dto";
import MassiveUpdateDto from "@/api/modules/product/dto/groups/massive-update.dto";

const localize = (key, module = "operations") =>
  PrintUtil.localize(key, module);

export const useProductGroupStore = defineStore({
  id: "product-group-store",
  state: () => ({
    searchTerm: "",
    groupList: [],
    selectedGroup: new ProductGroupDto(1, "", []),
    productGroupColumns: [{ field: "name", header: "NAME" }],
    productTableColumns: [
      { field: "name", header: PrintUtil.localize("nameCapslock", "default") },
      {
        field: "vendorCode",
        header: PrintUtil.localize("skuCapslock", "products"),
      },
      {
        field: "eanCode",
        header: "EAN",
      },
    ],
  }),
  getters: {
    getProductGroupsList: (state) => state.groupList,
    getSelectedGroup: (state) => state.selectedGroup,
    getColumns: (state) => state.productGroupColumns,
  },
  actions: {
    async loadGroupsList() {
      const productGroupModel = new ProductGroupModel();
      const getGroups = await productGroupModel.getAll();
      if (getGroups.success) {
        this.groupList = getGroups.getData();
      }

      return getGroups;
    },

    async loadSelectedGroup(groupId: number) {
      const productGroupModel = new ProductGroupModel();
      const getGroup = await productGroupModel.getOne(groupId);
      if (getGroup.success) {
        this.selectedGroup = getGroup.getData();
      }

      return getGroup;
    },

    async removeProductFromGroup(groupId: number, productId: number) {
      const newList = this.selectedGroup.products.filter(
        (el) => el.id != productId,
      );
      if (newList.length == this.selectedGroup.products.length) return;

      const productGroupModel = new ProductGroupModel();

      const res = await productGroupModel.update(
        groupId,
        new ProductGroupUpdateDto(
          null,
          newList.map((el) => el.id),
        ),
      );

      if (res.success) this.selectedGroup.products = newList;

      return res;
    },

    async updateGroup(groupId: number, groupUpdateDto: ProductGroupUpdateDto) {
      const productGroupModel = new ProductGroupModel();

      if (groupUpdateDto.name) {
        this.groupList = this.groupList.map((el) => {
          if (el.id == groupId)
            return {
              ...el,
              name: groupUpdateDto.name,
            };
          else return el;
        });
      }

      return await productGroupModel.update(groupId, groupUpdateDto);
    },

    async applyChanges(groupId: number, massiveUpdateDto: MassiveUpdateDto) {
      const productGroupModel = new ProductGroupModel();

      return await productGroupModel.apply(groupId, massiveUpdateDto);
    },
  },
});
