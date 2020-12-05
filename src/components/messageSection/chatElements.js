import styled from "styled-components";
import { Link } from "react-router-dom";

export const ChatContainer = styled.div`
  width: 70.6%;
  height: 100vh;
  padding:20px 0;
`;

export const BackLink = styled(Link)`
  position: absolute;
  left: 10px;
  color: #fff;
  cursor: pointer;
`;

export const ChatBox = styled.div`
  width: 70%;
  height: 100%;
  margin: 0px auto;
  border: 2px solid #000;

  @media screen and (max-width:769px){
    width:100%;
    border:none;
  }
`;

export const ChatHeader = styled.div`
  position: relative;
  padding: 10px 20px;
  background-color: #2f89fc;

  display: flex;
  align-items: center;
`;

export const ChatName = styled.h2`
  color: #fff;
  margin-left: 40px;
`;

export const Chats = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 75%;
`;
export const Chatwrapper = styled.div`
  padding: 8px 15px;
  border-radius: 6px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  width: 350px;
  height: auto;
  margin-bottom: 10px;
  background-color: ${(props) => (props.user ? "#a7ff83" : "#fff")};
  margin-left: ${(props) => (props.user ? "0px" : "8px")};
  margin-right: ${(props) => (props.user ? "8px" : "")};
  position: relative;
  align-self: ${(props) => (props.user ? "flex-end" : "flex-start")};

  @media screen and (max-width:769px){
    width:250px;
    margin-bottom:15px;
  }

  &::before {
    content: " ";
    width: 0;
    height: 0;
    z-index: 100;
    position: absolute;
    border-right: 17px solid ${(props) => (props.user ? "transparent" : "#fff")};
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 17px solid
      ${(props) => (props.user ? "#a7ff83" : "transparent")};
    right: ${(props) => props.user && "-25px"};
    left: ${(props) => !props.user && "-25px"};
    top: 0px;
  }
`;

export const Chatp = styled.p`
  font-size: 18px;

  @media screen and (max-width:769px){
    font-size:20px;
  }
`;
export const ChatInputForm = styled.form`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  align-items: center;
  position: relative;
  & .attach-icon {
    position: absolute;
    right: 20.2%;
  }

  
`;
export const ChatInput = styled.input`
  font-family: inherit;
  padding: 10px 22px;
  width: 70%;
  border-radius: 100px;
  border: 1px solid #000;
  outline: none;
  font-size: 18px;

  @media screen and (max-width:769px){
      width:80%;
      font-size:20px;
  }
`;
export const ChatSendBtn = styled.button`
  height: 50px;
  width: 50px;
  border-radius: 100px;
  background-color: #17b978;
  border: 0;
  outline: none;
  display: flex;
  visibility: ${(props) => (props.msg ? "visible" : "hidden")};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 10px;
`;

export const FileLableIcon = styled.label`
  cursor: pointer;
  z-index: 100;
  background-color: #fff;
`;
export const FileInput = styled.input`
  display: none;
`;
