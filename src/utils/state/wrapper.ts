import { createStore, combineReducers, AnyAction } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import order from "./order";
import orderer from "./orderer";


const combinedReducer = combineReducers({ order, orderer });
export type CombinedState = ReturnType<typeof combinedReducer>;

const reducer = (state: CombinedState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return action.state;
    default:
      return combinedReducer(state, action);
  }
};

const makeStore = () => createStore(reducer);

const sectionStateWrapper = createWrapper(makeStore, { debug: process.env.NODE_ENV === "development" });

export default sectionStateWrapper;
