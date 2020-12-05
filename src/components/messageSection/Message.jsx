import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getConversationList, fetchFollowings } from "../../Actions";
import { Avatar } from "@material-ui/core";
import { BsChatSquare } from "react-icons/bs";
import {
  ConversationBox,
  ConversationContainer,
  ConversationRow,
  UserPhoto,
  UserInfo,
  UserName,
  LastMsg,
  LastMsgTime,
  UserListIcon,
  ChatsH2,
  User,
} from "./conversationElements";

const Message = ({
  getConversationList,
  conversations,
  followings,
  fetchFollowings,
}) => {
  const curUserid = localStorage.getItem("id");

  console.log(followings);
  useEffect(() => {
    getConversationList();
    fetchFollowings(curUserid);
  }, []);
  const recipent = (recipents) => {
    return recipents.recipentsObj.filter((user) => {
      return user._id !== curUserid;
    });
  };
  const renderConversations = () => {
    return conversations.map((conversation) => {
      return (
        <ConversationRow to={`/chats/${recipent(conversation)[0]._id}`}>
          <Avatar />
          <UserInfo>
            <UserName>{recipent(conversation)[0].username}</UserName>
            <LastMsg>{conversation.lastMessage}</LastMsg>
          </UserInfo>
          <LastMsgTime>11.17</LastMsgTime>
        </ConversationRow>
      );
    });
  };
  const renderUsers = () => {
    return followings.map((following) => {
      return (
        <ConversationRow to={`/chats/${following.id}`}>
          <Avatar src={following.profilePhoto && following.profilePhoto} />
          <UserInfo>
            <UserName>
              {following.firstname + " " + following.lastname}
            </UserName>
          </UserInfo>
          <LastMsgTime>11.17</LastMsgTime>
        </ConversationRow>
      );
    });
  };

  return (
    <>
      {conversations && followings ? (
        <ConversationContainer>
          <ConversationBox>
            <ChatsH2>Chats</ChatsH2>
            {renderConversations()}
          </ConversationBox>
          <User>
            <ChatsH2>users</ChatsH2>
            {renderUsers()}
          </User>
        </ConversationContainer>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    conversations: state.chat.conversations,
    followings: state.info.followings,
  };
};

export default connect(mapStateToProps, {
  getConversationList,
  fetchFollowings,
})(Message);
