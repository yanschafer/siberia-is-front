import { defineStore } from 'pinia';
import axios from "axios";

export const useProductsStore = defineStore({
    id: 'products',
    state: () => ({
        searchTerm: '',
        productRows: [
            { id: 1, name: 'Product 1', sku: '11111', quantity: '23', price: 100 },
            { id: 2, name: 'Product 2', sku: '2222', quantity: '3', price: 100 },
        ],
        productColumns: [
            { field: 'name', header: 'NAME' },
            { field: 'sku', header: 'SKU' },
            { field: 'quantity', header: 'QUANTITY' },
            { field: 'price', header: 'PRICE' },
        ],
        productData: [
            {
                id: 1,
                productName: "Product 1",
                imageSource: "path/to/image1.jpg",
                sku: "SKU123",
                barcodeImage: "path/to/barcode1.jpg",
                brand: "BrandName",
                link: "http://example.com/product1",
                quantity: 10,
                lastTimeOrdered: "2023-01-01",
                lastPriceOrdered: 90,
                costPrice: 80,
                status: "Active",
                nailNippersCategory: "Category1",
                productDescription: "Product description 1",
                collectionName: "Collection1",
                color: "Red",
                volume: 250,
                size: 5,
                quantityPerPackage: 1,
                distributionPrice: 100,
                distributionPriceWithoutVat: 90,
                distributionMarkup: 10,
                professionalPrice: 120,
                professionalPriceWithoutVat: 110,
                professionalMarkup: 10,
                defaultPrice: 150,
                defaultPriceWithoutVat: 140,
                defaultMarkup: 10,
            }
        ],
    }),
    actions: {
        getFilteredProducts(searchTerm: string) {
            const filteredProducts = this.productRows.filter((row) =>
                Object.values(row).some((value) =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            if (filteredProducts.length > 0) {
                this.productRows = filteredProducts; // Обновляем значения в хранилище только если есть результаты
            }
            return filteredProducts;
        },
        loadProductData() {
            const searchTerm = this.getSearchTerm;
            const filteredStorehouses = this.productRows.filter((row) =>
                Object.values(row).some((value) =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            this.productRows = filteredStorehouses;
            return filteredStorehouses;
        },
    },
    getters: {
        getSearchTerm: (state) => state.searchTerm,
    },
});

export const useStorehousesStore = defineStore({
    id: 'storehouses',
    state: () => ({
        searchTerm: '',
        storehousesRows: [
            { id: 1, name: 'Storehouse 1', address: '123 Main St' },
            { id: 2, name: 'Storehouse 2', address: '456 Oak St' },
            { id: 3, name: 'Storehouse 3', address: '123 Main St' },
        ],
        storehousesColumns: [
            { field: 'name', header: 'NAME' },
            { field: 'address', header: 'ADDRESS' },
        ],
        storehousesData: [
            {
                id: '1',
                storehouseName: 'Storehouse 1',
                storehouseAdress: 'Storehouse adress 1'
            },
            {
                id: '2',
                storehouseName: 'Storehouse 2',
                storehouseAdress: 'Storehouse adress 2'
            },
            {
                id: '3',
                storehouseName: 'Storehouse 3',
                storehouseAdress: 'Storehouse adress 3'
            }
        ],
    }),
    getters: {
        getSearchTerm: (state) => state.searchTerm,
    },

    actions: {
        getFilteredStorehouses(searchTerm: string) {
            const filteredStorehouses = this.storehousesRows.filter((row) =>
                Object.values(row).some((value) =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            if (filteredStorehouses.length > 0) {
                this.storehousesRows = filteredStorehouses; // Обновляем значения в хранилище только если есть результаты
            }
            return filteredStorehouses;
        },
        loadStorehousesData() {
            const searchTerm = this.getSearchTerm;
            const filteredStorehouses = this.storehousesRows.filter((row) =>
                Object.values(row).some((value) =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            this.storehousesRows = filteredStorehouses;
            return filteredStorehouses;
        },
    },
});
export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        searchTerm: '',
        usersRows: [
            { id: 1, name: 'Orlando R Fiorentini 1' },
            { id: 2, name: 'Orlando R Fiorentini 2' },
            { id: 15, name: 'Sane4ka' },
        ],
        usersColumns: [
            { field: 'name', header: 'NAME' },
        ],
        usersData: [
            {
                id: 1,
                userName: 'Orlando R Fiorentini 1',
                userUsername: 'orlando',
                userPassword: '13213',
                tabNames: ['Tab 1488', 'Tab 2'], // Add tabNames property
                tabContent: ['Tab 1 Content', 'Tab 2 Content'] // Add tabContent property
            },
            {
                id: 2,
                userName: 'Orlando R Fiorentini 2',
                userUsername: 'orlando',
                userPassword: '123213',
                tabNames: ['Tab 1488', 'Tab 2'], // Add tabNames property
                tabContent: ['Tab 1 Content', 'Tab 2 Content'] // Add tabContent property
            },
            {
                id: 15,
                userName: 'Sane4ka',
                userUsername: 'orlando',
                userPassword: '123asd',
                tabNames: ['Tab 1488', 'Tab 2'], // Add tabNames property
                tabContent: ['1488', 'Tab 2 Content'] // Add tabContent property
            },
        ],
    }),
    getters: {
        getSearchTerm: (state) => state.searchTerm,
    },

    actions: {
        getFilteredUsers(searchTerm: string) {
            const filteredUsers = this.usersData.filter((row) =>
                Object.values(row).some((value) =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            if (filteredUsers.length > 0) {
                this.usersData = filteredUsers; // Обновляем значения в хранилище только если есть результаты
            }
            return filteredUsers;
        },
        loadUsersData() {
            const searchTerm = this.getSearchTerm;
            const filteredUsers = this.usersData.filter((row) =>
                Object.values(row).some((value) =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            this.usersData = filteredUsers;
            return filteredUsers;
            // Получаем данные из API или другого источника данных
            // и добавляем их в массивы storehousesRows и storehousesColumns
            // ...

            // Затем вызываем функцию getFilteredStorehouses

            // this.getFilteredStorehouses(this.searchTerm);
        },
    },
});

export const useRolesStore = defineStore({
    id: 'roles',
    state: () => ({
        searchTerm: '',
        rolesRows: [
            { id: 1, roleName: 'Administrator', usersPerRole: '2' },
            { id: 2, roleName: 'Moderator', usersPerRole: '10' },
            { id: 3, roleName: 'Seller', usersPerRole: '20' },
        ],
        rolesColumns: [
            { field: 'roleName', header: 'ROLE NAME' },
            { field: 'usersPerRole', header: 'USERS PER ROLE' }
        ],
        rolesData: [
            { id: 1, roleName: 'Administrator' },
            { id: 2, roleName: 'Moderator' },
            { id: 3, roleName: 'Seller' },
        ],
    }),
    getters: {
        getSearchTerm: (state) => state.searchTerm,
    },

    actions: {
        getFilteredRoles(searchTerm: string) {
            const filteredRoles = this.rolesRows.filter((row) =>
                Object.values(row).some((value) =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            if (filteredRoles.length > 0) {
                this.rolesRows = filteredRoles; // Обновляем значения в хранилище только если есть результаты
            }
            return filteredRoles;
        },
        loadRolesData() {
            const searchTerm = this.getSearchTerm;
            const filteredRoles = this.rolesRows.filter((row) =>
                Object.values(row).some((value) =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            this.rolesRows = filteredRoles;
            return filteredRoles;
        },
    },
});

export const useHistoryStore = defineStore({
    id: 'history',
    state: () => ({
        searchTerm: '',
        historyRows: [
            { id: 1, target: 'Storehouse', targetName: 'Storehouse 1', type: 'Edited', author: 'orlando', dateTime: '2' },
            { id: 2, target: 'Storehouse', targetName: 'Storehouse 1', type: 'Edited', author: 'orlando', dateTime: '2' },
            { id: 3, target: 'Storehouse', targetName: 'Storehouse 1', type: 'Edited', author: 'orlando', dateTime: '2' },
        ],
        historyColumns: [
            { field: 'target', header: 'TARGET' },
            { field: 'targetName', header: 'TARGET NAME' },
            { field: 'type', header: 'TYPE' },
            { field: 'author', header: 'AUTHOR' },
            { field: 'dateTime', header: 'DATE | TIME' }
        ],
        historyData: [
            { id: 1, target: 'Storehouse', targetName: 'Storehouse 1', type: 'Edited', author: 'orlando', dateTime: '2' },
            { id: 2, target: 'Storehouse', targetName: 'Storehouse 1', type: 'Edited', author: 'orlando', dateTime: '2' },
            { id: 3, target: 'Storehouse', targetName: 'Storehouse 1', type: 'Edited', author: 'orlando', dateTime: '2' },
        ],
    }),
    getters: {
        getSearchTerm: (state) => state.searchTerm,
    },

    actions: {
        getFilteredHistory(searchTerm: string) {
            const filteredHistory = this.historyRows.filter((row) =>
                Object.values(row).some((value) =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            if (filteredHistory.length > 0) {
                this.historyRows = filteredHistory; // Обновляем значения в хранилище только если есть результаты
            }
            return filteredHistory;
        },
        loadHistoryData() {
            const searchTerm = this.getSearchTerm;
            const filteredHistory = this.historyRows.filter((row) =>
                Object.values(row).some((value) =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            this.historyRows = filteredHistory;
            return filteredHistory;
        },
    },
});

export const useOperationsStore = defineStore({
    id: 'operations',
    state: () => ({
        searchTerm: '',
        operationsRows: [
            { id: 1, operation: 'Transfer', from: 'Storehouse 1', to: 'Storehouse 2', status: 'Completed' },
            { id: 2, operation: 'Transfer', from: 'Storehouse 1', to: 'Storehouse 2', status: 'Waiting for aprove' },
            { id: 3, operation: 'New order', from: '', to: 'Storehouse 2', status: 'Waiting for aprove' },
        ],
        operationsColumns: [
            { field: 'operation', header: 'OPERATION' },
            { field: 'from', header: 'FROM' },
            { field: 'to', header: 'TO' },
            { field: 'status', header: 'STATUS' },
        ],
        operationsData: [
            { id: 1, operation: 'Transfer', from: 'Storehouse 1', to: 'Storehouse 2', status: 'Completed' },
            { id: 2, operation: 'Transfer', from: 'Storehouse 1', to: 'Storehouse 2', status: 'Waiting for aprove' },
            { id: 3, operation: 'New order', from: '', to: 'Storehouse 2', status: 'Waiting for aprove' },
        ],
    }),
    getters: {
        getSearchTerm: (state) => state.searchTerm,
    },

    actions: {
        getFilteredOperations(searchTerm: string) {
            const filteredOperations = this.operationsRows.filter((row) =>
                Object.values(row).some((value) =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            if (filteredOperations.length > 0) {
                this.operationsRows = filteredOperations; // Обновляем значения в хранилище только если есть результаты
            }
            return filteredOperations;
        },
        loadOperationsData() {
            const searchTerm = this.getSearchTerm;
            const filteredOperations = this.operationsRows.filter((row) =>
                Object.values(row).some((value) =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            this.operationsRows = filteredOperations;
            return filteredOperations;
        },
    },
});



export const useNotificationsStore = defineStore('notifications', {
    state: () => ({
        errorNotification: {
            type: 'error',
            title: 'That’s an error notification',
            text: 'Something went wrong. Please, try again or contact the administrator.',
            icon: 'exclamation-circle',
            iconColor: '#EA5555',
            dateTime: '20.12.2023 | 12:00',
            visible: true,
        },
        warningNotification: {
            type: 'warning',
            title: 'That’s a warning notification',
            text: 'Something needs your attention. Please, click here to see the details',
            icon: 'alert-triangle',
            iconColor: '#FFE589',
            dateTime: '20.12.2023 | 12:00',
            visible: true,
        },
        defaultNotification1: {
            type: 'default',
            title: 'That’s a default notification',
            text: 'Just a simple notification',
            icon: 'bell',
            iconColor: '#B8B8B8',
            dateTime: '20.12.2023 | 12:00',
            visible: true,
        },
        defaultNotification2: {
            type: 'default',
            title: 'That’s a default notification',
            text: 'Just a simple notification',
            icon: 'bell',
            iconColor: '#B8B8B8',
            dateTime: '20.12.2023 | 12:00',
            visible: true,
        },
    }),

    actions: {
        hideNotification(notification: any) {
            notification.visible = false;
        },

        hideAllNotifications() {
            this.errorNotification.visible = false;
            this.warningNotification.visible = false;
            this.defaultNotification1.visible = false;
            this.defaultNotification2.visible = false;
        },

    },
});

export const useTabsStore = defineStore('tabs', {
    state: () => ({
        activeTab: 'Personal permissions',
        tabContent: {
            'Personal permissions': 'Tab 1 content',
            'role1-2': 'Tab 2 content',
            'role1-3': 'Tab 3 content',
            'role1-4': 'Tab 4 content',
        },
        tabNames: {
            'role1-1': 'Tab 1',
            'role1-2': 'Tab 2',
            'role1-3': 'Tab 3',
            'role1-4': 'Tab 4',
        },
    }),
});
export const useSearchStore = defineStore({
    id: 'search',
    state: () => ({
        searchTerm: '',
    }),
    actions: {
        setSearchTerm(searchTerm: string) {
            this.searchTerm = searchTerm;
        },
    },
});