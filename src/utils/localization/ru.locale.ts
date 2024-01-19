//   🪆🪆🪆🪆🪆🪆🪆🪆🪆🪆🪆🪆🪆🪆🪆🪆🪆🪆🪆
// 🪆    Россия — священная наша держава,     🪆
// 🪆    Россия — любимая наша страна,        🪆
// 🪆    Могучая воля, великая слава,         🪆
// 🪆    Твое достоянье на все времена.       🪆
// 🪆    Славься, Отечество, наше свободное,  🪆
// 🪆    Братских народов союз вековой,       🪆
// 🪆    Предками данная мудрость народная,   🪆
// 🪆    Славься, страна, мы гордимся тобой.  🪆
// 🪆    От южных морей до полярного края     🪆
// 🪆    Раскинулись наши леса и поля,        🪆
// 🪆    Одна ты на свете, одна ты такая,     🪆
// 🪆    Хранимая Богом родная земля.         🪆
// 🪆    Славься, Отечество, наше свободное,  🪆
// 🪆    Братских народов союз вековой,       🪆
// 🪆    Предками данная мудрость народная,   🪆
// 🪆    Славься, страна, мы гордимся тобой.  🪆
// 🪆    Широкий простор для мечты и для жизни🪆
// 🪆    Грядущие нам открывают года.         🪆
// 🪆    Нам силу дает наша верность Отчизне, 🪆
// 🪆    Так было так есть и так будет всегда.🪆
// 🪆    Славься, Отечество, наше свободное,  🪆
// 🪆    Братских народов союз вековой,       🪆
// 🪆    Предками данная мудрость народная,   🪆
// 🪆    Славься, страна, мы гордимся тобой.  🪆
//   🪆🪆🪆🪆🪆🪆🪆🪆🪆🪆🪆🪆🪆🪆🪆🪆🪆🪆🪆
//
//       Посвящается Роману Бонч-Бруевичу
//       А так же: Вере Алексеевне, Вален-
//       тине Петровне Любимовой, Башке

export default {
  modules: {
    default: {
      userName: "Имя пользователя",
      login: "Логин",
      password: "Пароль",
      something_wrong:
        "Что-то пошло не так. Пожалуйста, свяжитесь с администратором.",
      confirmDeletion: "Подтверждение удаления",
      errorMessageCopiedToClipboard: "Ошибка скопирована в буфер обмена",
      errorOccurred: "Произошла ошибка",
      somethingWrong:
        "Что-то пошло не так, предоставьте этот код администратору.",

      cancelCapslock: "ОТМЕНА",
      editCapslock: "РЕДАКТИРОВАТЬ",
      deleteCapslock: "УДАЛИТЬ",
      createCapslock: "СОЗДАТЬ",
      saveCapslock: "СОХРАНИТЬ",
      nameCapslock: "НАЗВАНИЕ",
      nothingFound: "Ничего не найдено",
      nothingFoundClarifyQuery: "Пожалуйста, уточните поисковый запрос.",
      rulesUpdatedToast: "Роли обновлены",
      rulesUpdatedToastDetails: "Ваша роль была обновлена администратором.",
    },
    router: {
      panelName: "Siberia Panel",
      dashboard: "статистика",
      assortments: "ассортимент",

      products: "товары",
      NewProduct: "Создание товара",
      Product: "Товар",

      storehouses: "склады",
      NewStorehouse: "Создание склада",
      Storehouse: "Склады",

      users: "пользователи",
      NewUser: "Новый пользователь",
      User: "Пользователь",

      roles: "роли",
      NewRole: "Новая роль",
      Role: "Роль",

      History: "История",
      SingleHistory: "Страница истории",

      Operations: "Операции",
      SingleOperation: "Страница операции",
    },
    sidebar: {
      Dashboard: "Статистика",
      Products: "Товары",
      Assortments: "Ассортимент",
      Storehouses: "Склады",
      Users: "Пользователи",
      Roles: "Роли",
    },
    //HeaderComponent
    header: {
      History: "История",
      Operations: "Операции",
      Profile: "Профиль",
      Notifications: "Уведомления",
      AddBtnLabel: "+ Добавить",
    },
    auth: {
      bad_credentials:
        "Введенная комбинация логина и пароля не существует. Пожалуйста, проверьте данные, или свяжитесь с администратором.",
      error_empty_fields: "Логин и пароль не могут быть пустыми",
    },
    user: {
      //CreateUser.vue
      namePlaceholder: "Введите реальное имя пользователя",
      loginPlaceholder: "Придумайте логин",
      passwordPlaceholder: "Придумайте пароль",
      createUserCapslock: "СОЗДАТЬ ПОЛЬЗОВАТЕЛЯ",
      userIsCreated: "Пользователь успешно создан",

      //SingleUserView.vue
      deleteWarn: "Вы уверены, что хотите удалить пользователя",
      deleteDisclaimer:
        "Это действие нельзя отменить, данные пользователя будут удалены",
      personalRules: "Уникальные права",
      personalRulesDescription:
        "Права, которые уникальны только для этого пользователя",
      userRolesCapslock: "РОЛИ ПОЛЬЗОВАТЕЛЯ",
      userNameCapslock: "ЛОГИН ПОЛЬЗОВАТЕЛЯ",
      userNameCapslockSpaced: "ИМЯ",
      passwordCapslock: "ПАРОЛЬ",
      roleCapslock: "РОЛЬ",
      userIsUpdated: "Пользователь обновлен",
      deletionFailed: "Ошибка при удалении",
      userNotFound: "Пользователь не найден",
      editUserRoles: "Изменить роли пользователя",
      currentUser: "Текущий ползователь",

      //UsersView.vue
      name: "Номер",
      login: "Логин",
      nothingWasFound: "Ничего не найдено",

      profileHeader: "Профиль",
      logout: "Выйти",
    },
    role: {
      //RolesView.vue
      nothingWasFound: "Ничего не найдено",
      pleaseClarifyYourSearchQuery: "Пожалуйста, уточните поисковый запрос",

      //roles.store
      roleNameCapslock: "НАЗВАНИЕ РОЛИ",
      relatedUsersCountCapslock: "ПОЛЬЗОВАТЕЛЕЙ С РОЛЬЮ",

      //CreateRole.vue
      roleName: "Название роли",
      roleDescription: "Описание роли",
      createRoleCapslock: "СОЗДАТЬ РОЛЬ",
      enterARoleName: "Придумайте название роли",
      enterARoleDescription: "Придумайте описание роли",
      rules: "Права",
      rulesForNewRole: "Права для новой роли",
      roleIsCreated: "Права созданы",

      //SingleRoleView.vue
      relatedUsersCapslock: "ОТНОСИТСЯ К ПОЛЬЗОВАТЕЛЯМ",
      deleteDisclaimer:
        "Это действие нельзя отменить, все данные роли будут удалены",
      deleteWarn: "Вы уверены, что хотите удалить роль",
      roleDescriptionCapslock: "ОПИСАНИЕ РОЛИ",
      editRelatedUsers: "Введите пользователей, относящихся к роли",
      rolePermissions: "Права роли",
      roleIsUpdated: "Роль обновлена",
      roleIsRemoved: "Роль удалена",
      deletionFailed: "Ошибка при удалении",
      roleNotFound: "Роль не найдена",

      //RolesComponent.vue
      tabSelectPlaceholder: "Выберите склад",
      mainGroup: "Основная группа",

      "User managing": "Управление пользователями",
      "Rbac managing": "Управление ролями",
      "Check logs": "Проверьте логи",
      "Brand managing": "Управление брендами",
      "Collection managing": "Управление коллекциями",
      "Category managing": "Управление категориями",
      "Products managing": "Управление товарами",
      "Stock managing": "Управление складами",
      "Arrival managing": "Управление приходом",
      "Create arrivals": "Регистрация прихода",
      "Approve and cancel arrivals": "Подтвердить и отменить приход",
      "Sales managing": "Управление продажами",
      "Create sales": "Регистрация продажи",
      "Approve and cancel sales": "Подтвердить или отменить продажу",
      "Requests managing": "Управление запросами",
      "Create requests": "Регистрация запроса",
      "Approve and cancel requests": "Подтверждение или отмена запроса",
      "Get request in process": "Запрос в процессе",
      "Approve request delivery": "Подтверждение доставки запроса",
    },
    products: {
      //CreateProduct.vue
      productNameCapslock: "НАЗВАНИЕ ТОВАРА",
      skuCapslock: "КОД",
      linkCapslock: "ССЫЛКА",
      colorCapslock: "ЦВЕТ",
      quantityPerPackageCapslock: "КОЛ-ВО В УПАКОВКЕ",
      distributionPriceCapslock: "РОЗНИЧНАЯ ЦЕНА",
      professionalPriceCapslock: "ПРОФЕССИОНАЛЬНАЯ ЦЕНА",
      defaultPriceCapslock: "ЦЕНА ПО УМОЛЧАНИЯ",
      selectACategory: "Выберите категорию",
      selectABrand: "Выберите бренд",
      selectACollection: "Выберите коллекцию",
      createACategory: "Выберите категорию",
      selectParentCategory: "Выберите родительскую категорию",
      categoryName: "Название категории",
      createABrand: "Выберите бренд",
      brandName: "Название бренда",
      createACollection: "Создать коллекцию",
      collectionName: "Название коллекции",
      placeholderDescription: "Новое описание товара...",
      placeholderProductName: "Новое название товара...",
      placeholderVendorCode: "Новый код товара...",
      placeholderLink: "Новая ссылка на товар...",
      placeholderExpirationDate: "Годен до...",
      placeholderColor: "Новый цвет...",
      placeholderNumber: "Число...",
      failedUpload: "Ошибка загрузки",
      photoUploadingFailed: "Ошибка при загрузке фото",
      creationFailed: "Ошибка создания",
      notFound: "не найдено",
      productSuccessfullyCreated: "Продукт успешно создан",

      //products.store.ts
      priceCapslock: "ЦЕНА",

      //ProductsView.vue
      vendorCode: "Код производителя",
      name: "Название",
      description: "Описание",
      color: "Цвет",
      purchasePrice: "Закупочная цена",
      distributorPrice: "Розничная цена",
      professionalPrice: "Профессиональная цена",
      commonPrice: "Цена по умолчанию",
      amountInBox: "Кол-во в упаковке",
      brand: "Бренд",
      collection: "Коллекция",
      category: "Категория",
      updateFailed: "Ошибка обновления",
      priceCantBeEmpty: "Цена не может быть пустой",
      badPriceProvided: "Задано неверное значение для цены",

      //SingleProductView.vue
      brandCapslock: "БРЕНД",
      openInNewWindowCapslock: "ОТКРЫТЬ В НОВОЙ ВКЛАДКЕ",
      quantityCapslock: "КОЛ-ВО",
      lastTimeOrderedCapslock: "ВРЕМЯ ПОСЛЕДНЕЙ ЗАКУПКИ",
      lastPriceOrderedCapslock: "СТОИМОСТЬ ПРИ ПОСЛЕДНЕЙ ЗАКУПКЕ",
      newColorNameCapslock: "НОВЫЙ ЦВЕТ",
      expirationDateCapslock: "ГОДЕН ДО",
      areYouSureYouWantToDeleteProduct: "Вы уверены что хотите удалить товар",
      noBrand: "Нет бренда",
      noInformation: "Нет информации",
      noCategory: "Нет категории",
      noCollection: "Нет коллекции",
      thisActionCannotBeUndoneThisProductDataWillBeLost:
        "Это действие нельзя отменить, все данные о товаре будут удалены",
      productDescription: "Описание товара",
      categoryIsCreated: "Категория создана",
      categoryCreationFailed: "Ошибка при создании категории",
      brandIsCreated: "Бренд создан",
      brandCreationFailed: "Ошибка при создании бренда",
      collectionIsCreated: "Коллекция создана",
      collectionCreationFailed: "Ошибка при создании коллекции",
      productIsRemoved: "Товар удален",
      productSuccessfullyUpdated: "Товар успешно обновлен",
    },
    storehouses: {
      //CreateStorehouse.vue
      storehouseName: "Название склада",
      storehouseAddress: "Адрес склада",
      enterStorehouseName: "Введите название склада",
      enterStorehouseAddress: "Введите адрес склада",
      storehouseCreationSuccess: "Склад успешно создан",

      //SingleStorehouseView.vue
      editStorehouse: "Редактировать склад",
      deleteStorehouseCapslock: "УДАЛЕНИЕ СКЛАДА",
      newArrivalCapslock: "+ НОВОЕ ПОСТУПЛЕНИЕ",
      newSaleCapslock: "+ НОВАЯ ПРОДАЖА",
      newRequestCapslock: "+ НОВЫЙ ЗАПРОС ТОВАРОВ",
      newArrivalRegistration: "Регистрация прихода",
      newSaleRegistration: "Регистрация продажи",
      newRequestRegistration: "Регистрация запроса",
      confirmDeletion: "Подтвердите удаление",
      deleteWarn:
        "Это действие нельзя отменить, все данные склада будут удалены",
      messageForUser: "Вы уверены, что хотите удалить склад",
      changesWereSaved: "Изменения сохранены",
      success: "Успешно",
      created: "создано",
      autoApproved: "проверенно автоматически",
      failed: "Ошибка",
      notEnoughProducts: "Недостаточно товаров для продажи",
      storehouseIsRemoved: "Склад удален",
      storehouseNotFound: "Склад не найден",
      noStorehouseAvailable: "Нет доступных складов",
      tryToEditStorehouse:
        "Попробуйте отредактировать доступные склады во вкладке 'Пользователи', или сообщите администратору.",

      //storehouse.store.ts
      addressCapslock: "АДРЕС",

      //StorehouseOperation.vue
      selectAProduct: "Выберите товар",
      quantity: "Кол-во",
      price: "Цена",
      quantityAndProductMustBeSelected: "Вы должны указать цену и товар",
      priceMustBeSelected: "Вы должны указать цену",
      notEnoughProductsStorehouses: "Не достаточно товаров",
      noProductInList: "В списке еще нет товаров",
      pleaseAddOneFirst: "Пожалуйста, начните с добавления товара.",
      productAlreadyInList: "Продукт уже есть в списке.",
    },
    filters: {
      //FiltersSidebarComponent.vue
      search: "Поиск",
      clear: "Сбросить",

      //MinMaxDateFilter.vue
      min: "мин",
      max: "макс",
    },
    components: {
      //SearchComponent.vue
      search: "Поиск",

      //TreeDropdownComponent.vue
      createNameForACollection: "Введите название коллекции",

      //DialogComponent.vue
      message:
        "Вы хотите удалить подкатегории, или привязать их к другому родителю?",
      validateError: "Ошибка валидации",
      checkDataProvided: "Проверьте данные",

      //TabsComponent
      rules: "Права",
      added: "добавлены",
      removed: "удалены",

      //LangSelectComponent
      langChangeHeading: "Язык изменен",
      langChangeDetail: "Страница будет перезагружена автоматически",

      //FileUploadComponent.vue
      releaseToDropFileHere: "Отпустите файл для загрузки",
      dropFileHereOr: "Перетащите файл в это окно, или",
      clickHere: "нажмите здесь",
      toUpload: "для загрузки.",

      //NotificationComponent.vue
      clearAllNotifications: "ОЧИСТИТЬ ВСЕ",
      successNotiHeading: "Успешно!",
      successNotiText: "Текст успешного уведомления",
      infoNotiHeading: "Инфо",
      infoNotiText: "Текст информационного сообщения",
      errorNotiHeading: "Ошибка",
      errorNotiText: "Текст сообщения об ошибке",
    },
    utils: {
      //api-model.util.ts
      rulesUpdated: "Роли обновлены",
      yourRulesWereUpdated: "Ваши права были обновлены администратором.",
    },
    storehousesSave: {
      token_is_dead: "Токен устарел. Пожалуйста, перезайдите в систему",
      wrong_data_type:
        "Неверный тип данных. Пожалуйста, проверьте данные и попробуйте снова",
    },
    assortment: {
      createPlusCapslock: "СОЗДАТЬ +",
      tableNameHeader: "НАЗВАНИЕ",
      brand: "Бренд",
      collection: "Коллекция",
      category: "Категория",
      confirmModalTitle: "Подтвердить удаление",
      confirmModalText: "Вы уверены, что хотите удалить",
      confirmModalDisclaimer: "Это действие нельзя отменить, ",
      dataWillBeLostText: "данные будут потеряны",
      Success: "Успех",

      modalHeaderCreateCategory: "Создать категорию",
      selectName: "Родительская категория",
      inputNameCategory: "Название категории",
      editCategoryHeader: "Изменить категорию",
      removeCategoryHeader: "Удалить категорию",
      toastSuccessCreationCategory: "Категория создана",
      toastSuccessUpdateCategory: "Категория обновлена",
      toastSuccessRemoveCategory: "Категория удалена",
      toastErrorCreationCategory: "Ошибка создания категории",
      toastErrorUpdateCategory: "Ошибка обновления категории",
      toastErrorRemoveCategory: "Ошибка удаления категории",
      removeChildrenTitle: "Удалить дочерние элементы",
      moveChildrenToAnotherParent:
        "Переместить дочерние элементы к другому родителю",

      modalHeaderCreateBrand: "Создать бренд",
      inputNameBrand: "Название бренда",
      toastSuccessCreationBrand: "Бренд создан",
      toastErrorCreationBrand: "Ошибка создания бренда",
      brandRemoveSuccessToast: "Бренд удален",
      brandUpdatedSuccessToast: "Бренд обновлен",

      modalHeaderCreateCollection: "Создать коллекцию",
      inputNameCollection: "Название коллекции",
      toastSuccessCreationCollection: "Коллекция создана",
      toastErrorCreationCollection: "Ошибка создания коллекции",
      collectionRemoveSuccessToast: "Коллекция удалена",
      collectionUpdatedSuccessToast: "Коллекция обновлена",

      failedBadParent: "Выберите другую категории в качестве родительской",
      checkBoxParentValueRemove: "Удалить дочерние",
      checkBoxParentValueMoveToNew: "Перенести в новую родительскую группу",

      //auth-check.store
      Brands: "Бренды",
      Collections: "Коллекции",
      Categories: "Категории",
    },
    history: {
      Operation: "Операция",
      Author: "Автор",
      DateRange: "Диапазон дат",
      EventType: "Тип события",
      EventObjectType: "Тип объекта события",

      //history.store + SingleHistoryView.vue
      targetCapslock: "ЦЕЛЬ",
      targetNameCapslock: "НАЗВАНИЕ ЦЕЛИ",
      typeCapslock: "ТИП",
      authorCapslock: "АВТОР",
      dateCapslock: "ДАТА",

      Create: "Создать",
      Update: "Обновить",
      Remove: "Удалить",

      "Stock event": "Событие склада",
      "User event": "Событие пользователя",
      "Role event": "Событие роли",
      "Product event": "Событие продукта",
      "Brand event": "Событие бренда",
      "Collection event": "Событие коллекции",
      "Category event": "Событие категории",
      "Transaction event": "Событие операции",
    },
    operations: {
      Arrival: "Приход",
      Sale: "Продажа",
      Request: "Запрос",

      operationType: "Тип операции",
      operationStatus: "Статус операции",
      storehouseTo: "Склад, куда",
      storehouseFrom: "Склад, откуда",

      Open: "Открыт",
      Created: "Создан",
      "Creation cancelled": "Создание отменено",
      "In progress": "В процессе",
      "Processing cancelled": "Обработка отменена",
      Delivered: "Доставлен",
      "Not delivered": "Не доставлен",
      Failed: "Неудачно",
      Processed: "Обработано",
      "Delivery cancelled": "Доставка отменена",

      updateStatusError: "Ошибка обновления статуса",
      storehouseIsRequired: "Требуется склад",
      selectDifferentStorehouse: "Выберите другой склад",
      storehouseAndStatusRequiredError: "Требуются склад и статус",
      notEnoughProductsInStore: "Недостаточно продуктов на складе",
      statusRequired: "Требуется статус",

      storehouseCapslock: "СКЛАД",
      statusCapslock: "СТАТУС",
      nameCapslock: "НАЗВАНИЕ",
      skuCapslock: "SKU",
      quantityCapslock: "КОЛИЧЕСТВО",
      priceCapslock: "ЦЕНА",
      success: "Успешно",
      statusUpdated: "Статус обновлен",

      selectStorehousePlaceholder: "Выберите склад",
      save: "Сохранить",
      productsIn: "Товары в",
      from: "от",
      to: "к",
      "Change status": "Изменить статус",
      Cancel: "Отмена",

      operationCapslock: "ОПЕРАЦИЯ",
      fromCapslock: "ИЗ",
      toCapslock: "В",
    },
    dashboard: {
      //DashboardView.vue
      lastDay: "За последний день",
      week: "За неделю",
      month: "За месяц",
      quarter: "За квартал",
      sales: "Продажи",
      website: "Сайт",
      store: "Склад",
      lastSaleDateCapslock: "ДАТА ПОСЛЕДНЕЙ ПРОДАЖИ",
      totalQuantityCapslock: "ОБЩЕЕ КОЛ-ВО",
      totalValueCapslock: "ОБЩАЯ СТОИМОСТЬ",
      leastBestsellingItems: "Самые непродоваемые товары",
      soldFrom: "Продано на 800K из 1M",
    },
  },
};
