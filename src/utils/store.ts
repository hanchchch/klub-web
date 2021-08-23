import { Product, ProductCategory } from "@src/types/product";

export const products: Product[] = [
  {
    id: 0,
    name: "T-Shirt White",
    price: 16900,
    description: "Product 0 description",
    image: "https://picsum.photos/200/300",
    category: ["shirt"],
  },
  {
    id: 1,
    name: "T-Shirt Black",
    price: 16900,
    description: "Product 0 description",
    image: "https://picsum.photos/200/300",
    category: ["shirt"],
  },
  {
    id: 2,
    name: "Klub Stickers",
    price: 7900,
    description: "Product 0 description",
    image: "https://picsum.photos/200/300",
    category: ["sticker"],
  },
  {
    id: 3,
    name: "Tumbler",
    price: 5900,
    description: "Product 0 description",
    image: "https://picsum.photos/200/300",
    category: ["tumbler"],
  },
  {
    id: 4,
    name: "T-Shirt & Stickers",
    price: 20800,
    description: "Product 0 description",
    image: "https://picsum.photos/200/300",
    category: ["shirtSet", "sticker"],
  },
  {
    id: 5,
    name: "T-Shirt & Tumbler",
    price: 22800,
    description: "Product 0 description",
    image: "https://picsum.photos/200/300",
    category: ["shirtSet", "tumbler"],
  },
  {
    id: 6,
    name: "Tumbler & Stickers",
    price: 11800,
    description: "Product 0 description",
    image: "https://picsum.photos/200/300",
    category: ["tumbler", "sticker"],
  },
  {
    id: 7,
    name: "T-Shirt & Tumbler & Stickers",
    price: 27700,
    description: "Product 0 description",
    image: "https://picsum.photos/200/300",
    category: ["shirtSet", "tumbler", "sticker"],
  },
];

export const categoryOptions: { [key in ProductCategory]: string[] } = {
  shirt: ["shirtSize"],
  sticker: [],
  tumbler: ["tumblerColor"],
  shirtSet: ["shirtSize", "shirtColor"],
};

export const options: { [key: string]: { label: string, values: string[] } } = {
  shirtSize: {
    label: "T-Shirt Size / 티셔츠 사이즈",
    values: ["M", "L", "XL"],
  },
  shirtColor: {
    label: "T-Shirt Color / 티셔츠 색상",
    values: ["White", "Black"],
  },
  tumblerColor: {
    label: "Tumbler Color / 텀블러 색상",
    values: ["Black", "Pink"],
  },
};

export const donation: string[] = [
  "[코로나19] 고려대학교 안암병원",
  "[아동] 아름다운안암지역아동센터",
  "[노인] 보문요양원",
  "[장애인] 성북장애인복지관",
  "[환경] 녹색법률센터(성북구)",
  "[학교] KU PRIDE CLUB",
];

export const deliveryCharge = 3500;