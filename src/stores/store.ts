import { defineStore } from "pinia";

export const useNotificationsStore = defineStore("notifications", {
  state: () => ({
    errorNotification: {
      type: "error",
      title: "That’s an error notification",
      text: "Something went wrong. Please, try again or contact the administrator.",
      icon: "exclamation-circle",
      iconColor: "#EA5555",
      date: "20.12.2023 | 12:00",
      visible: true,
    },
    warningNotification: {
      type: "warning",
      title: "That’s a warning notification",
      text: "Something needs your attention. Please, click here to see the details",
      icon: "alert-triangle",
      iconColor: "#FFE589",
      date: "20.12.2023 | 12:00",
      visible: true,
    },
    defaultNotification1: {
      type: "default",
      title: "That’s a default notification",
      text: "Just a simple notification",
      icon: "bell",
      iconColor: "#B8B8B8",
      date: "20.12.2023 | 12:00",
      visible: true,
    },
    defaultNotification2: {
      type: "default",
      title: "That’s a default notification",
      text: "Just a simple notification",
      icon: "bell",
      iconColor: "#B8B8B8",
      date: "20.12.2023 | 12:00",
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

export const useTabsStore = defineStore("tabs", {
  state: () => ({
    activeTab: "Personal permissions",
    tabContent: {
      "Personal permissions": "Tab 1 content",
      "role1-2": "Tab 2 content",
      "role1-3": "Tab 3 content",
      "role1-4": "Tab 4 content",
    },
    tabNames: {
      "role1-1": "Tab 1",
      "role1-2": "Tab 2",
      "role1-3": "Tab 3",
      "role1-4": "Tab 4",
    },
  }),
});

export const useSearchStore = defineStore({
  id: "search",
  state: () => ({
    searchTerm: "",
  }),
  actions: {
    setSearchTerm(searchTerm: string) {
      this.searchTerm = searchTerm;
    },
  },
});
