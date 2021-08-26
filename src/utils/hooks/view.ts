import { useDispatch, useSelector } from "react-redux";
import { CombinedState } from "@src/utils/state/wrapper";
import { setViewAction } from "../state/view";
import { ViewProduct } from "@src/types/product";

export default function useView(): [ViewProduct, (view: ViewProduct) => void] {
  const state = useSelector((state: CombinedState) => state.view);
  const dispatch = useDispatch();

  return [state?.view, (view: ViewProduct) => dispatch(setViewAction(view))];
}
