import { useDispatch, useSelector } from "react-redux";
import { CombinedState } from "@src/utils/state/wrapper";
import { setOrdererAction } from "../state/orderer";
import { Orderer } from "@src/types/order";

export default function useOrderer(): [Orderer, (orderer: Orderer) => void] {
  const state = useSelector((state: CombinedState) => state.orderer);
  const dispatch = useDispatch();

  return [state?.orderer, (orderer: Orderer) => dispatch(setOrdererAction(orderer))];
}
