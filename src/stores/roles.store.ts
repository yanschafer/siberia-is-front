import {defineStore} from "pinia";
import RoleModel from "@/api/modules/rbac/models/role.model";
import UpdateRoleDto from "@/api/modules/rbac/dto/roles/update-role.dto";

export const useRolesStore = defineStore({
  id: 'roles',
  state: () => ({
    searchTerm: '',
    selectedRole: {},
    rolesRows: [],
    rolesColumns: [
      { field: 'name', header: 'ROLE NAME' },
      { field: 'relatedUsersCount', header: 'USERS PER ROLE' }
    ],
  }),
  getters: {
    getSearchTerm: (state) => state.searchTerm,
    getSelectedRole: (state) => state.selectedRole,
    getRolesList: (state) => state.rolesRows
  },
  actions: {
    async loadRolesList() {
      const roleModel = new RoleModel()
      const getRoles = await roleModel.getAll()
      if (getRoles.success) {
        this.rolesRows = getRoles.getData()
      }
    },

    async loadSelectedRole(roleId: number) {
      const roleModel = new RoleModel()
      const role = await roleModel.getOne(roleId)
      if (role.success) {
        this.selectedRole = role.getData()
      }
    },

    async updateRole(roleId: number, roleUpdateDto: UpdateRoleDto) {
      const roleModel = new RoleModel()
      const updateResult = await roleModel.update(roleId, roleUpdateDto)
      if (updateResult.success) {
        this.selectedRole = {
          ...this.selectedRole,
          name: updateResult.getData().name,
          description: updateResult.getData().description
        }
        this.rolesRows = this.rolesRows.map(el => {
          if (el.id == roleId) {
            el.name = updateResult.getData().name
          }
          return el
        })
      }
      return updateResult
    }
  },
});