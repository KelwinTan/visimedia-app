import {
  UserOutlined,
  AppstoreOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";

const navItems = [
  {
    label: "Role",
    icon: UserOutlined,
  },

  {
    label: "Banner",
    icon: UserOutlined,
  },

  {
    label: "Category",
    icon: AppstoreOutlined,
  },

  {
    label: "Product",
    icon: AppstoreOutlined,
  },

  {
    label: "Best Product",
    icon: AppstoreOutlined,
  },

  {
    label: "Variant",
    icon: AppstoreOutlined,
  },

  {
    label: "Order",
    icon: OrderedListOutlined,
  },

  {
    label: "Order Status",
    icon: OrderedListOutlined,
  },
];

export default navItems;

export const navItemsPath = [
  "/role",
  "/banner",
  "/category",
  "/product",
  "/best-product",
  "/variant",
  "/order",
  "/order-status",
];
