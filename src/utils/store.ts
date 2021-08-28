import { ProductCategory } from "@src/types/product";

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
    values: ["Black"],
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
