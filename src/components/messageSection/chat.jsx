import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getChatList, createMsg, getSingleUser } from "../../Actions";
import { IoMdAttach, IoMdSend } from "react-icons/io";
import { FiArrowLeft } from "react-icons/fi";
import { useParams } from "react-router-dom";
import {
  ChatContainer,
  ChatBox,
  ChatHeader,
  ChatName,
  Chatwrapper,
  Chatp,
  Chats,
  ChatInputForm,
  ChatInput,
  ChatSendBtn,
  FileInput,
  FileLableIcon,
  BackLink,
} from "./chatElements";
import Pusher from "pusher-js";

const ChatScreen = ({
  getChatList,
  chats,
  createMsg,
  getSingleUser,
  curChatUser,
}) => {
  const [msg, setMsg] = useState("");
  const id = useParams().userid;
  const curUserid = localStorage.getItem("id");
  const curChatId = useParams().userid;
  useEffect(() => {
    // var pusher = new Pusher("0922f9f2b94ce73ff40f", {
    //   cluster: "ap2",
    // });
    // const channel = pusher.subscribe("messages");
    // channel.bind("inserted", (data) => {
    //   getChatList(id);
    // });
    getChatList(id);
    getSingleUser(curChatId);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    createMsg(id, { text: msg });
    setMsg("");
  };
  const isUser = (id) => {
    return curUserid === id;
  };

  const renderChats = () => {
    return chats.map((chat) => {
      return (
        <Chatwrapper user={isUser(chat.from)}>
          <Chatp>{chat.text}</Chatp>
        </Chatwrapper>
      );
    });
  };
  return (
    <ChatContainer>
      <ChatBox>
        {curChatUser ? (
          <ChatHeader>
            <BackLink to={`/messages`}>
              <FiArrowLeft size={24} className="arrow-left" />
            </BackLink>
            <ChatName>{curChatUser.username}</ChatName>
          </ChatHeader>
        ) : null}
        {chats ? <Chats>{renderChats()}</Chats> : null}
        <ChatInputForm onSubmit={(e) => handleSubmit(e)}>
          <ChatInput
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            type="text"
            placeholder="Type here something"
          />
          <FileLableIcon className="attach-icon">
            <IoMdAttach size={26} />
            <FileInput type="file" />
          </FileLableIcon>
          <ChatSendBtn msg={msg}>
            <IoMdSend size={22} color={"#fff"} />
          </ChatSendBtn>
        </ChatInputForm>
      </ChatBox>
    </ChatContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    chats: state.chat.conversationChats,
    curChatUser: state.chat.curUser,
  };
};

export default connect(mapStateToProps, { getChatList, createMsg, getSingleUser })(
  ChatScreen
);
