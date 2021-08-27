import { Product, ProductCategory } from "@src/types/product";

const toImages = (name: string, num: number) => {
  const images = [];
  for (let i = 1; i <= num; i++) {
    images.push(`/assets/images/${name}_${i}.jpeg`);
  }
  return images;
};

export const products: Product[] = [
  {
    id: 0,
    name: "T-Shirt White",
    price: 16900,
    description: "키치한 무드의 KLUB 오리지널 캐릭터 오버핏 티셔츠\n-학교 밖에서도 편하게 입을 수 있어요.",
    image: "/assets/images/shirtW_7.jpeg",
    images: toImages("shirtW", 8),
    category: ["shirt"],
  },
  {
    id: 1,
    name: "T-Shirt Black",
    price: 16900,
    description: "심플한 무드의 KU 로고 프린팅 티셔츠\n크림슨 색배합과 캠퍼스 위치가 새겨져있어요.",
    image: "/assets/images/shirtB_6.jpeg",
    images: toImages("shirtB", 6),
    category: ["shirt"],
  },
  {
    id: 2,
    name: "Laptop Stickers",
    price: 5900,
    description:
      "무광 스티커 9종으로 구성된 KLUB의 오리지널 스티커 세트\n노트북, 핸드폰, 노트, 아이패드 등에\n붙이기 적당한 사이즈에요.\nKU의 무드로 주변을 꾸며보세요!",
    image: "/assets/images/sticker_1.jpeg",
    images: toImages("sticker", 5),
    category: ["sticker"],
  },
  {
    id: 3,
    name: "Tumbler",
    price: 7900,
    description:
      "카페, 학교 등에서 가볍게 쓰기 좋은 컴팩트한 사이즈에요.\n분리형 이중 구조로 되어있어 세척, 보온이 용이합니다.",
    image: "/assets/images/tumbler_4.jpeg",
    images: toImages("tumbler", 6),
    category: ["tumbler"],
  },
  {
    id: 4,
    name: "Libertas Set",
    orignalPrice: 22800,
    price: 20800,
    description: "티셔츠 & 스티커\n\n일상에서 소소하게 느낌내기 좋은 세트!",
    image: "/assets/images/stickShirt_1.jpeg",
    images: toImages("stickShirt", 1),
    category: ["shirtSet", "sticker"],
  },
  {
    id: 5,
    name: "Justitia Set",
    orignalPrice: 24800,
    price: 22800,
    description: "티셔츠 & 텀블러\n\n이번 학기 과탑 예약! 공부할 때 쓰기 좋은 실용성 최고 세트",
    image: "/assets/images/shirtTum_1.jpeg",
    images: toImages("shirtTum", 3),
    category: ["shirtSet", "tumbler"],
  },
  {
    id: 6,
    name: "Veritas Set",
    orignalPrice: 13800,
    price: 11800,
    description: "스티커 & 텀플러\n\n수험생, 선후배 선물로 제격인 아이템 세트!",
    image: "/assets/images/stickTum_1.jpeg",
    images: toImages("stickTum", 2),
    category: ["tumbler", "sticker"],
  },
  {
    id: 7,
    name: "Young-Tiger Set",
    orignalPrice: 30700,
    price: 27700,
    description: "티셔츠 & 스티커 & 텀블러\n\n모든 걸 다 담았다! 한정 판매 아이템들을 놓치기 싫은 당신을 위한 세트",
    image: "/assets/images/allSet_2.jpeg",
    images: toImages("allSet", 2),
    category: ["shirtSet", "tumbler", "sticker"],
  },
];

export const categoryOptions: { [key in ProductCategory]: string[] } = {
  shirt: ["shirtSize"],
  sticker: [],
  tumbler: ["tumblerColor"],
  shirtSet: ["shirtSize", "shirtColor"],
};

export const options: { [key: string]: { label: string; values: string[] } } = {
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
