const redux = require("redux");
const createStore = redux.createStore;

// states
const initialState = {
  noOfCakes: 10,
};

//actions
const buyCake = () => {
  return {
    type: "BUY_CAKE",
    info: "Buy a cake",
  };
};

//reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "BUY_CAKE":
      return {
        ...state,
        noOfCakes: state.noOfCakes - 1,
      };
    default:
      return state;
  }
};

//store
const store = createStore(reducer);
console.log("Initial State", store.getState());

const unsubscribe = store.subscribe(() =>
  console.log("Bought cake ", store.getState())
);

store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
unsubscribe();
