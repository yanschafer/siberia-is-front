import { defineStore } from 'pinia';

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