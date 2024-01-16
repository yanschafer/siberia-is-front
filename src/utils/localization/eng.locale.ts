export default {
  modules: {
    default: {
      userName: "User name",
      login: "Login",
      password: "Password",
      something_wrong: "Something went wrong. Please, contact administrator.",
      confirmDeletion: "Confirm deletion",
      errorMessageCopiedToClipboard: "Error message copied to clipboard",
      errorOccurred: "Error occurred",
      somethingWrong: "Something went wrong, provide this error code to administrator.",

      cancelCapslock: "CANCEL",
      editCapslock: "EDIT",
      deleteCapslock: "DELETE",
      createCapslock: "CREATE",
      saveCapslock: "SAVE",
      nameCapslock: "NAME",
    },
    router: {
      panelName: "Siberia Panel",
      dashboard: "dashboard",
      assortments: "assortments",

      products: "products",
      NewProduct: "New Product",
      Product: "Product details",

      storehouses: "storehouses",
      NewStorehouse: "New Storehouse",
      Storehouse: "Storehouse",

      users: "users",
      NewUser: "New user",
      User: "User",

      roles: "roles",
      NewRole: "New role",
      Role: "Role",

      History: "History",
      SingleHistory: "Single history",

      Operations: "Operations",
      SingleOperation: "Single operation",
    },
    sidebar: {
      Dashboard: "Dashboard",
      Products: "Products",
      Assortments: "Assortments",
      Storehouses: "Storehouses",
      Users: "Users",
      Roles: "Roles",
    },
    //HeaderComponent
    header: {
      History: "History",
      Operations: "Operations",
      Notifications: "Notifications",
      AddBtnLabel: "+ Add",
    },
    auth: {
      bad_credentials:
        "This combination of login/password doesn’t exist. Please, check info provided or contact with your administrator.",
      error_empty_fields: "Login and password must not be blank.",
    },
    user: {
      //CreateUser.vue
      namePlaceholder: "Enter a real user's name",
      loginPlaceholder: "Create user login",
      passwordPlaceholder: "Create password",
      createUserCapslock: "CREATE USER",

      //SingleUserView.vue
      deleteWarn: "Are you sure you want to delete user",
      deleteDisclaimer:
        "This action cannot be undone, this user data will be lost",
      personalRules: "Personal rules",
      personalRulesDescription: "Rules which are related only to this user",
      userRolesCapslock: "USER ROLES",
      userNameCapslock: "USERNAME",
      passwordCapslock: "PASSWORD",
    },
    role: {
      //roles.store
      roleNameCapslock: "ROLE NAME",
      relatedUsersCountCapslock: "USERS PER ROLE",

      //CreateRole.vue
      roleName: "Role name",
      roleDescription: "Role description",
      createRoleCapslock: "CREATE ROLE",

      //SingleRoleView.vue
      relatedUsersCapslock: "RELATED USERS",
      deleteDisclaimer:
        "This action cannot be undone, this role data will be lost",
      deleteWarn: "Are you sure you want to delete role",
    },
    products:{
      //CreateProduct.vue
      productNameCapslock: "PRODUCT NAME",
      skuCapslock: "SKU",
      linkCapslock: "LINK",
      colorCapslock: "COLOR",
      quantityPerPackageCapslock: "QUANTITY PER PACKAGE",
      distributionPriceCapslock: "DISTRIBUTION PRICE",
      professionalPriceCapslock: "PROFESSIONAL PRICE",
      defaultPriceCapslock: "DEFAULT PRICE",
      selectACategory: "Select a category",
      selectABrand: "Select a brand",
      selectACollection: "Select a collection",
      createACategory: "Create a category",
      selectParentCategory: "Select parent category",
      categoryName: "Category name",
      createABrand: "Create a brand",
      brandName: "Brand name",
      createACollection: "Create a collection",
      collectionName: "Collection name",
      placeholderDescription: 'Add new description...',
      placeholderProductName: 'Add new product name...',
      placeholderVendorCode: 'Add new SKU...',
      placeholderLink: 'Add new link...',
      placeholderExpirationDate: 'Enter expiration date...',
      placeholderColor: 'Add new color...',
      placeholderNumber: 'Number...',

      //products.store.ts
      priceCapslock: "PRICE",

      //ProductsView.vue
      vendorCode: "Vendor Code",
      name: "Name",
      description: "Description",
      color: "Color",
      purchasePrice: "Purchase Price",
      distributorPrice: "Distributor Price",
      professionalPrice: "Professional Price",
      commonPrice: "Common Price",
      amountInBox: "Amount in box",
      brand: "Brand",
      collection: "Collection",
      category: "Category",

      //SingleProductView.vue
      brandCapslock: "BRAND",
      openInNewWindowCapslock: "OPEN IN NEW WINDOW",
      quantityCapslock: "QUANTITY",
      lastTimeOrderedCapslock: "LAST TIME ORDERED",
      lastPriceOrderedCapslock: "LAST PRICE ORDERED",
      newColorNameCapslock: "NEW COLOR NAME",
      expirationDateCapslock: "EXPIRATION DATE",
      areYouSureYouWantToDeleteProduct: "Are you sure you want to delete product",
      noBrand: "No brand",
      noInformation: "No information",
      noCategory: "No category",
      noCollection: "No collection",
      thisActionCannotBeUndoneThisProductDataWillBeLost: "This action cannot be undone, this product data will be lost",
      productDescription: "Product description",
    },
    storehouses:{
      //CreateStorehouse.vue
      storehouseName: "Storehouse name",
      storehouseAddress: "Storehouse address",
      enterStorehouseName: "Enter storehouse name",
      enterStorehouseAddress: "Enter storehouse address",

      //SingleStorehouseView.vue
      editStorehouse: "Edit storehouse",
      deleteStorehouseCapslock: "DELETE STOREHOUSE",
      newArrivalCapslock: "+ NEW ARRIVAL",
      newSaleCapslock: "+ NEW SALE",
      newRequestCapslock: "+ NEW REQUEST",
      newArrivalRegistration: "New Arrival Registration",
      newSaleRegistration: "New Sale Registration",
      newRequestRegistration: "New Request Registration",
      confirmDeletion: "Confirm deletion",
      deleteWarn: "This action cannot be undone, this storehouse data will be lost",
      messageForUser: "Are you sure you want to delete storehouse named",
      changesWereSaved: "Changes were saved",
      success: "Success",

      //storehouse.store.ts
      addressCapslock: "ADDRESS",

      //StorehouseOperation.vue
      selectAProduct: "Select a product",
    },
    filters:{
      //FiltersSidebarComponent.vue
      search: "Search",

      //MinMaxDateFilter.vue
      min: "min",
      max: "max",
    },
    components:{
      //SearchComponent.vue
      search: "Search",
    },
    storehousesSave: {
      token_is_dead: "Expired token. Please, relogin",
      wrong_data_type: "Wrong data type. Please, check data provided",
    },
  },
};
