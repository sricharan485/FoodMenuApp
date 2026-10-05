import { Product } from "../types";

export const categories: string[] = [
  "Recommended",
  "Starters",
  "Main Course",
  "Beverages",
  "Desserts",
];

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Burger",
    description:
      "Juicy grilled patty with fresh vegetables and special sauce.",
    price: 249,
    category: "Recommended",
    emoji: "🍔",
    chefPick: true,
  },

  {
    id: "2",
    name: "Margherita Pizza",
    description:
      "Classic pizza with tomato, mozzarella and fresh basil.",
    price: 299,
    category: "Recommended",
    emoji: "🍕",
  },

  {
    id: "3",
    name: "French Fries",
    description:
      "Crispy golden fries with delicious seasoning.",
    price: 129,
    category: "Starters",
    emoji: "🍟",
  },

  {
    id: "4",
    name: "Garlic Bread",
    description:
      "Toasted bread with garlic butter and herbs.",
    price: 149,
    category: "Starters",
    emoji: "🥖",
  },

  {
    id: "5",
    name: "Pasta Alfredo",
    description:
      "Creamy Alfredo pasta with parmesan and fresh herbs.",
    price: 279,
    category: "Main Course",
    emoji: "🍝",
    chefPick: true,
  },

  {
    id: "6",
    name: "Paneer Rice Bowl",
    description:
      "Spiced paneer served with rice and vegetables.",
    price: 259,
    category: "Main Course",
    emoji: "🥗",
  },

  {
    id: "7",
    name: "Fresh Lemonade",
    description:
      "Refreshing lemonade with lemon and mint.",
    price: 99,
    category: "Beverages",
    emoji: "🍋",
  },

  {
    id: "8",
    name: "Cold Coffee",
    description:
      "Chilled creamy coffee with soft coffee foam.",
    price: 149,
    category: "Beverages",
    emoji: "☕",
  },

  {
    id: "9",
    name: "Chocolate Cake",
    description:
      "Soft chocolate cake with rich chocolate frosting.",
    price: 179,
    category: "Desserts",
    emoji: "🍰",
    chefPick: true,
  },

  {
    id: "10",
    name: "Vanilla Ice Cream",
    description:
      "Creamy vanilla ice cream with chocolate topping.",
    price: 129,
    category: "Desserts",
    emoji: "🍨",
  },
];