//     Россия — священная наша держава,
//     Россия — любимая наша страна,
//     Могучая воля, великая слава,
//     Твое достоянье на все времена.
//     Славься, Отечество, наше свободное,
//     Братских народов союз вековой,
//     Предками данная мудрость народная,
//     Славься, страна, мы гордимся тобой.
//     От южных морей до полярного края
//     Раскинулись наши леса и поля,
//     Одна ты на свете, одна ты такая,
//     Хранимая Богом родная земля.
//     Славься, Отечество, наше свободное,
//     Братских народов союз вековой,
//     Предками данная мудрость народная,
//     Славься, страна, мы гордимся тобой.
//     Широкий простор для мечты и для жизни
//     Грядущие нам открывают года.
//     Нам силу дает наша верность Отчизне,
//     Так было так есть и так будет всегда.
//     Славься, Отечество, наше свободное,
//     Братских народов союз вековой,
//     Предками данная мудрость народная,
//     Славься, страна, мы гордимся тобой.

export default {
    modules: {
        default: {
            userName: "Имя пользователя",
            login: "Логин",
            password: "Пароль",
            something_wrong: "Что-то пошло не так. Пожалуйста, свяжитесь с администратором.",
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
        },
        router: {
            panelName: "Siberia Panel",
            dashboard: "дашборд",
            assortments: "ассортимент",

            products: "продукты",
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

            //SingleUserView.vue
            deleteWarn: "Вы уверены, что хотите удалить пользователя",
            deleteDisclaimer:
                "Это действие нельзя отменить, данные пользователя будут удалены",
            personalRules: "Уникальные права",
            personalRulesDescription: "Права, которые уникальны только для этого пользователя",
            userRolesCapslock: "РОЛИ ПОЛЬЗОВАТЕЛЯ",
            userNameCapslock: "ИМЯ ПОЛЬЗОВАТЕЛЯ",
            passwordCapslock: "ПАРОЛЬ",
        },
        role: {
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
            areYouSureYouWantToDeleteProduct:
                "Вы уверены что хотите удалить товар",
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

            //storehouse.store.ts
            addressCapslock: "АДРЕС",

            //StorehouseOperation.vue
            selectAProduct: "Выберите товар",
            quantity: "Кол-во",
            price: "Цена",
            quantityAndProductMustBeSelected: "Вы должны указать цену и товар",
            priceMustBeSelected: "Вы должны указать цену",
            notEnoughProductsStorehouses: "Не достаточно товаров",
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
        },
        storehousesSave: {
            token_is_dead: "Токен устарел. Пожалуйста, перезайдите в систему",
            wrong_data_type: "Неверный тип данных. Пожалуйста, проверьте данные и попробуйте снова",
        },
    },
};
