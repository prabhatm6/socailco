import React from "react";
import baseUrl from "../api/baseUrl";
import cookie from "js-cookie";
import uk, { UIkit } from "uikit";
import { toast } from "react-toastify";

const jwt = cookie.get("jwt");

toast.configure();
export const auth = (type, data) => {
  return async (dispatch) => {
    try {
      const res = await baseUrl.post(`/${type}`, data);
      if (res.data.status === "success") {
        const msg = `<span uk-icon="check"></span> Successfully Signed Up`;
        cookie.set("jwt", res.data.token);
        localStorage.setItem("id", res.data.user.id);
        toast.success("success", {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => {
          window.location.assign("/");
        }, 500);
      }
    } catch (err) {
      const msg = err.response.data.message;
      toast.error(msg, {
        autoClose: 1500,
        position: "top-center",
      });
    }
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    try {
      const res = await baseUrl.get(`/insta/getAllFollowingsPost/${jwt}`);
      dispatch({ type: "USERDATAFEED", payload: res.data });
    } catch (err) {
      console.log(err.response);
    }
  };
};
export const fetchCurUser = (userid) => {
  return async (dispatch) => {
    try {
      const res = await baseUrl.get(`/insta/${userid}`);
      dispatch({ type: "CURUSER", payload: res.data.user });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addTweet = (data) => {
  return async (dispatch) => {
    try {
      const res = await baseUrl.post(`/insta/uploadpost/${jwt}`, data);
      console.log(res.data);
      if (res.data.msg) {
        const res = await baseUrl.get(`/insta/getAllFollowingsPost/${jwt}`);
        dispatch({ type: "USERDATAFEED", payload: res.data });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};
export const deleteTweet = (postid) => {
  return async (dispatch) => {
    try {
      const res = await baseUrl.put(`/insta/deletepost/${jwt}/${postid}`);
    } catch (error) {
      console.log(error.response);
    }
  };
};
export const singleTweet = (postid) => {
  return async (dispatch) => {
    try {
      const res = await baseUrl.get(`/insta/singletweet/${postid}`);
      dispatch({ type: "SINGLE_POST", payload: res.data.post });
    } catch (error) {
      console.log(error.response);
    }
  };
};
export const createComment = (postid, userid, comment) => {
  return async (dispatch) => {
    try {
      const res = await baseUrl.post(`/insta/comment/${postid}/${userid}`, {
        comment,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};
export const createLike = (postid, userid) => {
  return async (dispatch) => {
    try {
      const res = await baseUrl.post(`/insta/like/${postid}/${userid}`);
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };
};
export const removeLike = (postid, userid) => {
  return async (dispatch) => {
    try {
      const res = await baseUrl.post(`/insta/remove/${postid}/${userid}`);
      console.log(res.data);
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const updateUser = (userid, data) => {
  return async (dispatch) => {
    try {
      const res = await baseUrl.put(`/user/${userid}`, data);
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const fetchUser = (userid) => {
  return async (dispatch) => {
    try {
      const res = await baseUrl.get(`/insta/${userid}`);
      dispatch({ type: "FETCH_USER", payload: res.data.user });
    } catch (error) {
      console.log(error);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      cookie.remove("jwt");
      if (!cookie.get("jwt")) {
        toast.success("logged out", {
          position: "top-center",
          autoClose: 2000,
        });
      }
      setTimeout(() => {
        window.location.assign("/");
      }, 500);
      dispatch({ type: "LOGOUT", payload: "logout" });
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchFollowers = (userid) => {
  return async (dispatch) => {
    try {
      const res = await baseUrl.get(`/insta/getfollowers/${userid}`);
      dispatch({ type: "FETCH_FOLLOWERS", payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
};
export const follow = (followid, userid) => {
  return async (dispatch) => {
    try {
      await baseUrl.put(`/insta/follow/${userid}/${followid}`);
    } catch (error) {
      console.log(error);
    }
  };
};
export const unfollow = (unfollowid, userid) => {
  return async (dispatch) => {
    try {
      await baseUrl.put(`/insta/unfollow/${userid}/${unfollowid}`);
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchFollowings = (userid) => {
  return async (dispatch) => {
    try {
      const res = await baseUrl.get(`/insta/getfollowings/${userid}`);
      dispatch({ type: "FETCH_FOLLOWINGS", payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
};
export const fetchAllUsers = () => {
  return async (dispatch) => {
    try {
      const res = await baseUrl.get("/");
      dispatch({ type: "FETCH_ALLUSERS", payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
};

//msg
const BASE_URL = "http://localhost:5000";
export const getConversationList = () => async (dispatch) => {
  try {
    const res = await baseUrl.get(`/getconversations/${jwt}`);
    dispatch({ type: "GET_CONVERSATION", payload: res.data.conversationList });
  } catch (error) {
    console.log(error.response);
  }
};
export const getChatList = (id) => async (dispatch) => {
  try {
    const res = await baseUrl.get(`/getchats/${id}/${jwt}`);
    dispatch({ type: "GET_CONVERSATIONCHATS", payload: res.data.messages });
  } catch (error) {
    console.log(error.response);
  }
};
export const getSingleUser = (id) => async (dispatch) => {
  try {
    const res = await baseUrl.get(`/user/${id}`);
    dispatch({ type: "GET_SINGLEUSER", payload: res.data.user });
  } catch (error) {
    console.log(error.response);
  }
};

export const createMsg = (id, data) => async (dispatch) => {
  try {
    const res = await baseUrl.post(`/createchat/${id}/${jwt}`, data);
    if (res.data.status === "success") {
      const res = await baseUrl.get(`/getchats/${id}/${jwt}`);
      dispatch({ type: "GET_CONVERSATIONCHATS", payload: res.data.messages });
    }
  } catch (error) {
    console.log(error.message);
  }
};
