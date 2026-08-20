// src/theme/theme.js

export const sparkCollabTheme = {
  token: {
    colorPrimary: "#059669",
    colorSuccess: "#16A34A",
    colorWarning: "#D97706",
    colorError: "#DC2626",

    colorText: "#0F172A",
    colorTextSecondary: "#64748B",

    colorBgBase: "#FFFFFF",
    colorBgContainer: "#FFFFFF",
    colorBgLayout: "#F8FAFC",

    colorBorder: "#E2E8F0",
    colorBorderSecondary: "#E2E8F0",

    borderRadius: 8,

    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  components: {
    Button: {
      controlHeight: 38,
      borderRadius: 8,
      fontWeight: 500,
    },

    Input: {
      controlHeight: 38,
      borderRadius: 8,
    },

    Select: {
      controlHeight: 38,
      borderRadius: 8,
    },

    Card: {
      borderRadiusLG: 12,
    },

    Modal: {
      borderRadiusLG: 12,
    },

    Dropdown: {
      borderRadiusLG: 8,
    },

    Menu: {
      itemBorderRadius: 8,
      itemSelectedColor: "#047857",
      itemSelectedBg: "#ECFDF5",
    },

    Table: {
      headerBg: "#F8FAFC",
      headerColor: "#0F172A",
      rowHoverBg: "#F0FDF4",
    },
  },
};