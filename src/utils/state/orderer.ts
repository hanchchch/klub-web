import { Orderer } from "@src/types/order";

const SET_ORDERER = "orderer/set";

export function setOrdererAction(orderer: Orderer) {
  return {
    type: SET_ORDERER,
    orderer,
  };
}

type OrdererAction = ReturnType<typeof setOrdererAction>;

export interface OrdererState {
  orderer: Orderer;
}

const initialState: OrdererState = {
  orderer: {
    name: "",
    phone: "",
    isShipping: false,
    address: "",
    donation: "",
  },
};

export default function ordererReducer(state: OrdererState = initialState, action: OrdererAction): OrdererState {
  switch (action.type) {
    case SET_ORDERER:
      return { orderer: action.orderer };
    default:
      return state;
  }
}
