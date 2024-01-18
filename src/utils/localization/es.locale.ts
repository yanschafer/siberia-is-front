export default {
  modules: {
    default: {
      userName: "Nombre de usuario",
      login: "Inicio de sesión",
      password: "Contraseña",
      something_wrong: "Algo salió mal. Por favor, contacta al administrador.",
      confirmDeletion: "Confirmar eliminación",
      errorMessageCopiedToClipboard: "Mensaje de error copiado al portapapeles",
      errorOccurred: "Se produjo un error",
      somethingWrong:
        "Algo salió mal, proporciona este código de error al administrador.",

      cancelCapslock: "CANCELAR",
      editCapslock: "EDITAR",
      deleteCapslock: "ELIMINAR",
      createCapslock: "CREAR",
      saveCapslock: "GUARDAR",
      nameCapslock: "NOMBRE",
      nothingFound: "Nada fue encontrado",
      nothingFoundClarifyQuery: "Por favor, aclara tu consulta de búsqueda.",
      rulesUpdatedToast: "Reglas actualizadas",
      rulesUpdatedToastDetails:
        "Tus reglas fueron actualizadas por el administrador",
    },
    router: {
      panelName: "Panel de Siberia",
      dashboard: "tablero",
      assortments: "asortimentos",

      products: "productos",
      NewProduct: "Nuevo Producto",
      Product: "Detalles del Producto",

      storehouses: "almacenes",
      NewStorehouse: "Nuevo Almacén",
      Storehouse: "Almacén",

      users: "usuarios",
      NewUser: "Nuevo usuario",
      User: "Usuario",

      roles: "roles",
      NewRole: "Nuevo rol",
      Role: "Rol",

      History: "Historial",
      SingleHistory: "Historia Individual",

      Operations: "Operaciones",
      SingleOperation: "Operación Individual",
    },
    sidebar: {
      //auth-check.store
      Dashboard: "Tablero",
      Products: "Productos",
      Assortments: "Asortimentos",
      Storehouses: "Almacenes",
      Users: "Usuarios",
      Roles: "Roles",
    },
    //HeaderComponent
    header: {
      History: "Historial",
      Operations: "Operaciones",
      Profile: "Perfil",
      Notifications: "Notificaciones",
      AddBtnLabel: "+ Agregar",
    },
    auth: {
      bad_credentials:
        "Esta combinación de usuario/contraseña no existe. Por favor, verifica la información proporcionada o contacta con tu administrador.",
      error_empty_fields:
        "El inicio de sesión y la contraseña no deben estar en blanco.",
    },
    user: {
      //CreateUser.vue
      namePlaceholder: "Ingrese el nombre real del usuario",
      loginPlaceholder: "Crear nombre de usuario",
      passwordPlaceholder: "Crear contraseña",
      createUserCapslock: "CREAR USUARIO",
      userIsCreated: "Usuario creado",

      //SingleUserView.vue
      deleteWarn: "¿Estás seguro de que deseas eliminar al usuario?",
      deleteDisclaimer:
        "Esta acción no se puede deshacer, se perderán los datos de este usuario",
      personalRules: "Reglas personales",
      personalRulesDescription:
        "Reglas que están relacionadas solo con este usuario",
      userRolesCapslock: "ROLES DE USUARIO",
      userNameCapslock: "NOMBRE DE USUARIO",
      userNameCapslockSpaced: "NOMBRE DE USUARIO",
      passwordCapslock: "CONTRASEÑA",
      roleCapslock: "ROL",
      userIsUpdated: "Usuario actualizado",
      deletionFailed: "Error al eliminar",
      userNotFound: "Usuario no encontrado",
      editUserRoles: "Editar roles de usuario",
      currentUser: "Usuario Actual",

      //UsersView.vue
      name: "Nombre",
      login: "Inicio de sesión",
      nothingWasFound: "No se encontró nada",

      //ProfileComponent
      profileHeader: "Perfil",
      logout: "Cerrar sesión",
    },
    role: {
      // RolesView.vue
      nothingWasFound: "No se encontró nada",
      pleaseClarifyYourSearchQuery: "Por favor, aclare su consulta de búsqueda",

      //roles.store
      roleNameCapslock: "NOMBRE DEL ROL",
      relatedUsersCountCapslock: "USUARIOS POR ROL",

      //CreateRole.vue
      roleName: "Nombre del Rol",
      roleDescription: "Descripción del Rol",
      createRoleCapslock: "CREAR ROL",
      enterARoleName: "Ingrese un nombre de rol",
      enterARoleDescription: "Ingrese una descripción de rol",
      rules: "Reglas",
      rulesForNewRole: "Reglas para el nuevo rol",
      roleIsCreated: "El rol ha sido creado",

      //SingleRoleView.vue
      relatedUsersCapslock: "USUARIOS RELACIONADOS",
      deleteDisclaimer:
        "Esta acción no se puede deshacer, se perderán los datos de este rol",
      deleteWarn: "¿Estás seguro de que deseas eliminar el rol?",
      roleDescriptionCapslock: "DESCRIPCIÓN DEL ROL",
      editRelatedUsers: "Editar usuarios relacionados",
      rolePermissions: "Permisos del rol",
      roleIsUpdated: "El rol ha sido actualizado",
      roleIsRemoved: "El rol ha sido eliminado",
      deletionFailed: "Error al eliminar",
      roleNotFound: "Rol no encontrado",

      //RolesComponent.vue
      tabSelectPlaceholder: "Seleccionar almacén",
      mainGroup: "Grupo principal",

      "User managing": "Gestión de usuarios",
      "Rbac managing": "Gestión de roles",
      "Check logs": "Ver registros",
      "Brand managing": "Gestión de marcas",
      "Collection managing": "Gestión de colecciones",
      "Category managing": "Gestión de categorías",
      "Products managing": "Gestión de productos",
      "Stock managing": "Gestión de almacenes",
      "Arrival managing": "Gestión de llegadas",
      "Create arrivals": "Crear llegadas",
      "Approve and cancel arrivals": "Aprobar y cancelar llegadas",
      "Sales managing": "Gestión de ventas",
      "Create sales": "Crear ventas",
      "Approve and cancel sales": "Aprobar y cancelar ventas",
      "Requests managing": "Gestión de solicitudes",
      "Create requests": "Crear solicitudes",
      "Approve and cancel requests": "Aprobar y cancelar solicitudes",
      "Get request in process": "Obtener solicitud en proceso",
      "Approve request delivery": "Aprobar la entrega de la solicitud",
    },
    products: {
      //CreateProduct.vue
      productNameCapslock: "NOMBRE DEL PRODUCTO",
      skuCapslock: "SKU",
      linkCapslock: "ENLACE",
      colorCapslock: "COLOR",
      quantityPerPackageCapslock: "CANTIDAD POR PAQUETE",
      distributionPriceCapslock: "PRECIO DE DISTRIBUCIÓN",
      professionalPriceCapslock: "PRECIO PROFESIONAL",
      defaultPriceCapslock: "PRECIO POR DEFECTO",
      selectACategory: "Seleccionar una categoría",
      selectABrand: "Seleccionar una marca",
      selectACollection: "Seleccionar una colección",
      createACategory: "Crear una categoría",
      selectParentCategory: "Seleccionar categoría principal",
      categoryName: "Nombre de la categoría",
      createABrand: "Crear una marca",
      brandName: "Nombre de la marca",
      createACollection: "Crear una colección",
      collectionName: "Nombre de la colección",
      placeholderDescription: "Agregar nueva descripción...",
      placeholderProductName: "Agregar nuevo nombre del producto...",
      placeholderVendorCode: "Agregar nuevo SKU...",
      placeholderLink: "Agregar nuevo enlace...",
      placeholderExpirationDate: "Ingresar fecha de vencimiento...",
      placeholderColor: "Agregar nuevo color...",
      placeholderNumber: "Número...",
      failedUpload: "Carga fallida",
      photoUploadingFailed: "Falló la carga de la foto",
      creationFailed: "Falló la creación",
      notFound: "no encontrado",
      productSuccessfullyCreated: "Producto creado exitosamente",

      //products.store.ts
      priceCapslock: "PRECIO",

      //ProductsView.vue
      vendorCode: "Código del proveedor",
      name: "Nombre",
      description: "Descripción",
      color: "Color",
      purchasePrice: "Precio de compra",
      distributorPrice: "Precio del distribuidor",
      professionalPrice: "Precio profesional",
      commonPrice: "Precio común",
      amountInBox: "Cantidad en la caja",
      brand: "Marca",
      collection: "Colección",
      category: "Categoría",
      updateFailed: "Fallo en la actualización",
      priceCantBeEmpty: "El precio no puede estar vacío",
      badPriceProvided: "Se proporcionó un precio incorrecto",

      //SingleProductView.vue
      brandCapslock: "MARCA",
      openInNewWindowCapslock: "ABRIR EN NUEVA VENTANA",
      quantityCapslock: "CANTIDAD",
      lastTimeOrderedCapslock: "ÚLTIMA VEZ PEDIDO",
      lastPriceOrderedCapslock: "ÚLTIMO PRECIO PEDIDO",
      newColorNameCapslock: "NOMBRE DEL NUEVO COLOR",
      expirationDateCapslock: "FECHA DE VENCIMIENTO",
      areYouSureYouWantToDeleteProduct:
        "¿Estás seguro de que deseas eliminar el producto?",
      noBrand: "Sin marca",
      noInformation: "Sin información",
      noCategory: "Sin categoría",
      noCollection: "Sin colección",
      thisActionCannotBeUndoneThisProductDataWillBeLost:
        "Esta acción no se puede deshacer, se perderán los datos de este producto",
      productDescription: "Descripción del producto",
      categoryIsCreated: "Categoría creada",
      categoryCreationFailed: "Error al crear la categoría",
      brandIsCreated: "Marca creada",
      brandCreationFailed: "Error al crear la marca",
      collectionIsCreated: "Colección creada",
      collectionCreationFailed: "Error al crear la colección",
      productIsRemoved: "Producto eliminado",
      productSuccessfullyUpdated: "Producto actualizado exitosamente",
    },
    storehouses: {
      //CreateStorehouse.vue
      storehouseName: "Nombre del almacén",
      storehouseAddress: "Dirección del almacén",
      enterStorehouseName: "Ingrese el nombre del almacén",
      enterStorehouseAddress: "Ingrese la dirección del almacén",
      storehouseCreationSuccess: "Éxito en la creación del almacén",

      //SingleStorehouseView.vue
      editStorehouse: "Editar almacén",
      deleteStorehouseCapslock: "ELIMINAR ALMACÉN",
      newArrivalCapslock: "+ NUEVA LLEGADA",
      newSaleCapslock: "+ NUEVA VENTA",
      newRequestCapslock: "+ NUEVA SOLICITUD",
      newArrivalRegistration: "Registro de Nueva Llegada",
      newSaleRegistration: "Registro de Nueva Venta",
      newRequestRegistration: "Registro de Nueva Solicitud",
      confirmDeletion: "Confirmar eliminación",
      deleteWarn:
        "Esta acción no se puede deshacer, se perderán los datos de este almacén",
      messageForUser: "¿Estás seguro de que deseas eliminar el almacén llamado",
      changesWereSaved: "Los cambios fueron guardados",
      success: "Éxito",
      created: "creado",
      autoApproved: "autoaprobado",
      failed: "Fallido",
      notEnoughProducts: "No hay suficientes productos para la venta",
      storehouseIsRemoved: "El almacén ha sido eliminado",
      storehouseNotFound: "Almacén no encontrado",
      noStorehouseAvailable: "No hay almacén disponible",
      tryToEditStorehouse:
        "Intenta editar los almacenes disponibles en la pestaña de administración de usuarios, o informa a tu administrador",

      //storehouse.store.ts
      addressCapslock: "DIRECCIÓN",

      //StorehouseOperation.vue
      selectAProduct: "Seleccionar un producto",
      quantity: "Cantidad",
      price: "Precio",
      quantityAndProductMustBeSelected: "Debe seleccionar Cantidad y Producto",
      priceMustBeSelected: "Debe seleccionar el Precio",
      notEnoughProductsStorehouses: "No hay suficientes productos",
      noProductInList: "Aún no hay productos en la lista",
      pleaseAddOneFirst: "Por favor, agrega uno primero",
      productAlreadyInList: "El producto ya esta listado",
    },
    filters: {
      //FiltersSidebarComponent.vue
      search: "Buscar",
      clear: "Restablecer",

      //MinMaxDateFilter.vue
      min: "min",
      max: "máx",
    },
    components: {
      //SearchComponent.vue
      search: "Buscar",

      //TreeDropdownComponent.vue
      createNameForACollection: "Crear nombre para una colección",

      //DialogComponent.vue
      message:
        "¿Te gustaría eliminar la categoría junto con sus subcategorías secundarias o reubicarlas en otro grupo principal?",
      validateError: "Error de validación",
      checkDataProvided: "Verificar los datos proporcionados",

      //TabsComponent
      rules: "Reglas",
      added: "añadido",
      removed: "eliminado",

      //LangSelectComponent
      langChangeHeading: "Idioma cambiado",
      langChangeDetail: "La página se recargará automáticamente",

      //FileUploadComponent.vue
      releaseToDropFileHere: "Suelta para soltar el archivo aquí.",
      dropFileHereOr: "Suelta el archivo aquí o",
      clickHere: "haz clic aquí",
      toUpload: "para cargar",
    },

    utils: {
      //api-model.util.ts
      rulesUpdated: "Las reglas han sido actualizadas",
      yourRulesWereUpdated:
        "Tus permisos han sido actualizados por el administrador.",
    },
    storehousesSave: {
      token_is_dead: "Token expirado. Por favor, vuelve a iniciar sesión",
      wrong_data_type:
        "Tipo de datos incorrecto. Por favor, verifica los datos proporcionados",
    },
    assortment: {
      //AssortmentView.vue
      createPlusCapslock: "CREAR +",
      tableNameHeader: "NOMBRE",
      brand: "Marca",
      collection: "Colección",
      category: "Categoría",
      confirmModalTitle: "Confirmar eliminación",
      confirmModalText: "¿Estás seguro de que deseas eliminar",
      confirmModalDisclaimer: "Esta acción no se puede deshacer, esto",
      dataWillBeLostText: "se perderán los datos",
      Success: "Éxito",

      modalHeaderCreateCategory: "Crear una categoría",
      selectName: "Categoría principal",
      inputNameCategory: "Nombre de la categoría",
      editCategoryHeader: "Editar categoría",
      removeCategoryHeader: "Eliminar categoría",
      toastSuccessCreationCategory: "La categoría ha sido creada",
      toastSuccessUpdateCategory: "La categoría ha sido actualizada",
      toastSuccessRemoveCategory: "La categoría ha sido eliminada",
      toastErrorCreationCategory: "Error al crear la categoría",
      toastErrorUpdateCategory: "Error al actualizar la categoría",
      toastErrorRemoveCategory: "Error al eliminar la categoría",
      removeChildrenTitle: "Eliminar hijos",
      moveChildrenToAnotherParent: "Mover hijos a otro padre",

      modalHeaderCreateBrand: "Crear una marca",
      inputNameBrand: "Nombre de la marca",
      toastSuccessCreationBrand: "La marca ha sido creada",
      toastErrorCreationBrand: "Error al crear la marca",
      brandRemoveSuccessToast: "La marca ha sido eliminada",
      brandUpdatedSuccessToast: "La marca ha sido actualizada",

      modalHeaderCreateCollection: "Crear una colección",
      inputNameCollection: "Nombre de la colección",
      toastSuccessCreationCollection: "La colección ha sido creada",
      toastErrorCreationCollection: "Error al crear la colección",
      collectionRemoveSuccessToast: "La colección ha sido eliminada",
      collectionUpdatedSuccessToast: "La colección ha sido actualizada",

      //auth-check.store
      Brands: "Marcas",
      Collections: "Colecciones",
      Categories: "Categorías",
    },
    history: {
      Operation: "Operación",
      Author: "Autor",
      DateRange: "Rango de fechas",
      EventType: "Tipo de evento",
      EventObjectType: "Tipo de objeto de evento",

      //history.store + SingleHistoryView.vue
      targetCapslock: "OBJETIVO",
      targetNameCapslock: "NOMBRE DEL OBJETIVO",
      typeCapslock: "TIPO",
      authorCapslock: "AUTOR",
      dateCapslock: "FECHA",

      Create: "Crear",
      Update: "Actualizar",
      Remove: "Eliminar",

      "Stock event": "Evento de Stock",
      "User event": "Evento de Usuario",
      "Role event": "Evento de Rol",
      "Product event": "Evento de Producto",
      "Brand event": "Evento de Marca",
      "Collection event": "Evento de Colección",
      "Category event": "Evento de Categoría",
      "Transaction event": "Evento de Operación",
    },
    operations: {
      Arrival: "Llegada",
      Sale: "Venta",
      Request: "Solicitud",

      operationType: "Tipo de operación",
      operationStatus: "Estado de la operación",
      storehouseTo: "Almacén DESTINO",
      storehouseFrom: "Almacén ORIGEN",

      Open: "Abierto",
      Created: "Creado",
      "Creation cancelled": "Creación cancelada",
      "In progress": "En progreso",
      "Processing cancelled": "Procesamiento cancelado",
      Delivered: "Entregado",
      "Not delivered": "No entregado",
      Failed: "Fallido",
      Processed: "Procesado",
      "Delivery cancelled": "Entrega cancelada",

      updateStatusError: "Error al actualizar el estado",
      storehouseIsRequired: "Se requiere almacén",
      selectDifferentStorehouse: "Selecciona un almacén diferente",
      storehouseAndStatusRequiredError: "Se requieren almacén y estado",
      notEnoughProductsInStore: "No hay suficientes productos en el almacén",
      statusRequired: "Se requiere estado",

      storehouseCapslock: "ALMACÉN",
      statusCapslock: "ESTADO",
      nameCapslock: "NOMBRE",
      skuCapslock: "SKU",
      quantityCapslock: "CANTIDAD",
      priceCapslock: "PRECIO",
      success: "Éxito",
      statusUpdated: "El estado ha sido actualizado",

      selectStorehousePlaceholder: "Selecciona un almacén",
      save: "Guardar",
      productsIn: "Productos en",
      from: "desde",
      to: "a",
      "Change status": "Cambiar estado",
      Cancel: "Cancelar",

      operationCapslock: "OPERACIÓN",
      fromCapslock: "DESDE",
      toCapslock: "A",
    },
    dashboard: {
      //DashboardView.vue
      lastDay: "Último día",
      week: "Semana",
      month: "Mes",
      quarter: "Trimestre",
      sales: "Ventas",
      website: "Sitio web",
      store: "Tienda",
      lastSaleDateCapslock: "FECHA DE ÚLTIMA VENTA",
      totalQuantityCapslock: "CANTIDAD TOTAL",
      totalValueCapslock: "VALOR TOTAL",
      leastBestsellingItems: "Productos Menos Vendidos",
      soldFrom: "800K vendidos de 1M",
    },
  },
};
