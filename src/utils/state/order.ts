import { Order } from "@src/types/order";

const SET_ORDER = "order/set";

export function setOrdersAction(orders: Order[]) {
  return {
    type: SET_ORDER,
    orders
  };
}

type OrderAction = ReturnType<typeof setOrdersAction>;

export interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

export default function newAdminReducer(state: OrderState = initialState, action: OrderAction): OrderState {
  switch (action.type) {
    case SET_ORDER:
      return { orders: action.orders };
    default:
      return state;
  }
}
