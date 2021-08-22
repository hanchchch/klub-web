import { useDispatch, useSelector } from "react-redux";
import { CombinedState } from "@src/utils/state/wrapper";
import { setOrdersAction } from "@src/utils/state/order";
import { Order } from "@src/types/order";

export default function useOrders(): [Order[], (orders: Order[]) => void] {
  const state = useSelector((state: CombinedState) => state.order);
  const dispatch = useDispatch();

  return [state?.orders, (orders: Order[]) => dispatch(setOrdersAction(orders))];
}
