import { defineStore } from 'pinia';
import axios from "axios";

export const useProductsStore = defineStore({
    id: 'products',
    state: () => ({
        searchTerm: '',
        productRows: [
            { id: 1, name: 'TableZalupa', sku: '11111', quantity: '23', price: 100 },
            { id: 2, name: 'TableZalupa2', sku: '2222', quantity: '3', price: 100 },
        ],
        productColumns: [
            { field: 'name', header: 'NAME' },
            { field: 'sku', header: 'SKU' },
            { field: 'quantity', header: 'QUANTITY' },
            { field: 'price', header: 'PRICE' },
        ],
        productData: [
            {
                id: 2,
                productName: "Zalupa2",
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
        getFilteredProducts(searchTerm) {
            console.log('searchTerm:', searchTerm);
            const filteredProducts = this.productRows.filter((row) =>
                Object.values(row).some((value) =>
                    String(value).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
            console.log('filteredProducts:', filteredProducts);
            return filteredProducts;
        },
        loadProductData() {
            this.productRows = [];
            this.productColumns = [];
            this.productData = [];
        },
        //     async loadProductData() {
        //         try {
        //             const response = await axios.get('/api/products');
        //             this.productColumns = response.data.columns;
        //             this.productRows = response.data.rows;
        //             this.productData = response.data.products;

        //         } catch (error) {
        //             console.error('Error loading product data:', error);
        //         }
        //     },
    },
    getters: {
        filteredProducts() {
            const searchTerm = this.searchTerm.toLowerCase();
            return this.productRows.filter((row) =>
                Object.values(row).some((value) =>
                    String(value).toLowerCase().includes(searchTerm)
                )
            );
        },
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
    actions: {
        loadStorehousesData() {
            this.storehousesRows = [];
            this.storehousesColumns = [];
            this.storehousesData = [];
        },
        //     async loadProductData() {
        //         try {
        //             const response = await axios.get('/api/products');
        //             this.storehousesColumns = response.data.columns;
        //             this.storehousesRows = response.data.rows;
        //             this.storehouseData = response.data.products;

        //         } catch (error) {
        //             console.error('Error loading storehouses data:', error);
        //         }
        //     },
    },
});
export const useSearchStore = defineStore({
    id: 'search',
    state: () => ({
        searchTerm: '',
    }),
    actions: {
        setSearchTerm(searchTerm) {
            this.searchTerm = searchTerm;
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
        hideNotification(notification) {
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