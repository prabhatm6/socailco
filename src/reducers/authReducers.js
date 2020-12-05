const INITIAL_STATE = {
  curuser: null,
  usersFeed: null,
  feeds: [],
};

const authReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CURUSER":
      return { ...state, curuser: action.payload };
    case "USERDATAFEED":
      return { ...state, usersFeed: action.payload };
    case "LOGOUT":
      return { user: null, followers: null, followings: null, feeds: [] };
    default:
      return state;
  }
};

export default authReducers;
