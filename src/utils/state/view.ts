import { ViewProduct } from "@src/types/product";

const SET_VIEW = "view/set";

export function setViewAction(view: ViewProduct) {
  return {
    type: SET_VIEW,
    view,
  };
}

type viewAction = ReturnType<typeof setViewAction>;

export interface ViewState {
  view: ViewProduct;
}

const initialState: ViewState = {
  view: "all",
};

export default function orderReducer(state: ViewState = initialState, action: viewAction): ViewState {
  switch (action.type) {
    case SET_VIEW:
      return { view: action.view };
    default:
      return state;
  }
}
