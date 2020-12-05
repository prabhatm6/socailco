const INITIALSTATE = {
  curUser: null,
  allUser: [],
  conversations: [],
  conversationChats: [],
};

const authReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case "GET_CONVERSATION":
      return { ...state, conversations: action.payload };
    case "GET_CONVERSATIONCHATS":
      return { ...state, conversationChats: action.payload };
    case "GET_SINGLEUSER":
      return { ...state, curUser: action.payload };
    default:
      return state;
  }
};

export default authReducer;
