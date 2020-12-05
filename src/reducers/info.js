const infoReducer = (
  state = {
    user: null,
    singlepost: null,
    allusers: [],
    followers: null,
    followings: null,
  },
  action
) => {
  switch (action.type) {
    case "FETCH_USER":
      return { ...state, user: action.payload };
    case "SINGLE_POST":
      return { ...state, singlepost: action.payload };
    case "FETCH_FOLLOWERS":
      return { ...state, followers: action.payload.followers };
    case "FETCH_FOLLOWINGS":
      return { ...state, followings: action.payload.followings };
    case "FETCH_ALLUSERS":
      return { ...state, allusers: action.payload.data };
    default:
      return state;
  }
};

export default infoReducer;
