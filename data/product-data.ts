export const products = [
  {
    id: '1',
    productName: "Pandesal",
    description:
      "A staple bread roll in the Philippines commonly eaten for breakfast",
    price: 1000, // PHP 10.00
  },
  {
    id: '2',
    productName: "Beef Pares",
    description:
      "A popular Filipino dish consisting of braised beef served with garlic rice and soup",
    price: 15000, // PHP 150.00
  },
  {
    id: '3',
    productName: "Tapsilog",
    description:
      "A traditional Filipino breakfast dish made with cured beef, garlic fried rice, and a fried egg",
    price: 12000, // PHP 120.00
  },
  {
    id: '4',
    productName: "Kapeng Barako",
    description:
      "A variety of coffee grown in the Philippines, known for its strong flavor",
    price: 3000, // PHP 30.00
  },
];

export type Product = typeof products[0];