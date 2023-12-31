import {defineStore} from "pinia";
import UserModel from "@/api/modules/user/models/user.model";
import UpdateUserDto from "@/api/modules/user/dto/update-user.dto";
import ApiResponseDto from "@/api/dto/api-response.dto";
import UserDto from "@/api/modules/user/dto/user.dto";

export const useUsersStore = defineStore({
  id: 'users',
  state: () => ({
    searchTerm: '',
    usersRows: [],
    usersColumns: [
      { field: 'name', header: 'NAME' },
    ],
    selectedUser: {},
  }),
  getters: {
    getSelectedUser: (state) => state.selectedUser,
    getUserList: (state) => state.usersRows,
    getSearchTerm: (state) => state.searchTerm,
  },
  actions: {
    async loadSelectedUser(id: number) {
      const userModel = new UserModel()
      const getUser = await userModel.getOne(id)
      if (getUser.success) {
        const userData = {...getUser.getData()}
        const rules = await userModel.getUserRules(id)
        const roles = await userModel.getUserRoles(id)
        if (rules.success && roles.success) {
          this.selectedUser = {
            ...userData,
            roles: roles.getData(),
            rules: rules.getData()
          }
        }
      }
    },
    async loadUsersList() {
      const userModel = new UserModel()
      const getUsers = await userModel.getAll()
      if (getUsers.success) {
        this.usersRows = getUsers.getData()
      } else {
        this.usersRows = []
      }
    },
    async updateUser(userId: number, userUpdateDto: UpdateUserDto): ApiResponseDto<UserDto> {
      const userModel = new UserModel()
      if (userUpdateDto.name != null)
        this.usersRows = this.usersRows.map(el => {
          if (el.id == userId)
            el.name = userUpdateDto.name

          return el
        })
      const saveResult = await userModel.update(userId, userUpdateDto)
      if (saveResult.success) {
        this.selectedUser = Object.assign(this.selectedUser, saveResult.getData())
      }
      return saveResult
    }
  },
});
