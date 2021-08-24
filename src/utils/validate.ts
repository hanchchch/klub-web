import { Orderer, OrdererError } from "@src/types/order";

export const validateOrderer = (orderer: Orderer): OrdererError => {
  const result = {};
  if (!orderer.name) {
    Object.assign(result, { name: "이름을 입력하세요." });
  }
  if (!/^([0-9]){11}$/.test(orderer.phone)) {
    Object.assign(result, { phone: "전화번호를 형식은 01012345678입니다." });
  }
  if (!orderer.phone) {
    Object.assign(result, { phone: "전화번호를 입력하세요." });
  }
  if (orderer.isShipping && !orderer.address) {
    Object.assign(result, { address: "주소를 입력하세요." });
  }
  if (!orderer.donation) {
    Object.assign(result, { donation: "기부처를 골라주세요." });
  }
  return result;
};
