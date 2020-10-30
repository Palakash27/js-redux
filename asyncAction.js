const redux = require("redux");
const axios = require("axios");
const reduxThunk = require("redux-thunk").default;

const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

//actions
const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

const fetchUserSuccess = (data) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: data,
  };
};

const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUserRequest());
    axios
      .get("https://jsonplacehoder.typicode.com/users")
      .then((response) => {
        dispatch(fetchUserSuccess(response.data.map((user) => user.id)));
      })
      .catch((error) => {
        dispatch(fetchUserFailure(error.message));
      });
  };
};

const store = redux.createStore(reducer, redux.applyMiddleware(reduxThunk));

const unsubscribe = store.subscribe(() => console.log(store.getState()));

store.dispatch(fetchUsers());
