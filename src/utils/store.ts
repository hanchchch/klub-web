import { Product, ProductCategory } from "@src/types/product";

export const products: Product[] = [
  {
    id: 0,
    name: "T-Shirt White",
    price: 16900,
    description: "통통튀는 MD가 좋은 고대생을 위한 KLUB 캐릭터 프린팅 반팔",
    image: "https://picsum.photos/200/300",
    category: ["shirt"],
  },
  {
    id: 1,
    name: "T-Shirt Black",
    price: 16900,
    description: "심플한 게 좋은 고대생을 위한 고려대 로고 프린팅 반팔",
    image: "https://picsum.photos/200/300",
    category: ["shirt"],
  },
  {
    id: 2,
    name: "Klub Stickers",
    price: 7900,
    description: "노트북, 캐리어 꾸미는 걸 좋아하는 고대생을 위한 자체제작 스티커 세트 ",
    image: "https://picsum.photos/200/300",
    category: ["sticker"],
  },
  {
    id: 3,
    name: "Tumbler",
    price: 5900,
    description: "에코 라이프를 실천하는 당신을 위한 리유저블 텀블러",
    image: "https://picsum.photos/200/300",
    category: ["tumbler"],
  },
  {
    id: 4,
    name: "T-Shirt & Stickers",
    price: 20800,
    description: "애교심 넘치나 수줍은 당신을 위한! 고대생인듯 아닌듯 소소하게 느낌내기 좋은 아이템",
    image: "https://picsum.photos/200/300",
    category: ["shirtSet", "sticker"],
  },
  {
    id: 5,
    name: "T-Shirt & Tumbler",
    price: 22800,
    description: "이번 학기 과탑 예약! 고대티 입고 고대 텀블러에 커피 마시며 열공할 당신을 위한 아이템",
    image: "https://picsum.photos/200/300",
    category: ["shirtSet", "tumbler"],
  },
  {
    id: 6,
    name: "Tumbler & Stickers",
    price: 11800,
    description: "고대를 사랑하는 모든 분들께 선물하세요! 수험생, 선후배 선물로 제격인 아이템",
    image: "https://picsum.photos/200/300",
    category: ["tumbler", "sticker"],
  },
  {
    id: 7,
    name: "T-Shirt & Tumbler & Stickers",
    price: 27700,
    description: "포브스 선정 고대생 필수템 1위! 당신의 사라진 고뽕을 채워줄 아",
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