import styled from "styled-components";
import { Link } from "react-router-dom";

export const ConversationContainer = styled.div`
  width: 70.6%;

  display:flex;
  justify-content:space-between;
`;

export const ConversationBox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right:2px solid grey;

  @media screen and (max-width: 769px) {
    width: 100%;
  }
`;
export const ConversationRow = styled(Link)`
  width: 70%;

  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 2px solid #000;
  padding: 10px;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in;

  @media screen and (max-width: 769px) {
    width: 80%;
  }
  &:hover {
    transform: scale(1.02);
  }
`;

export const ChatsH2 = styled.h2`
  margin:5px; 
`

export const UserPhoto = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #000;
`;
export const UserInfo = styled.div``;
export const UserName = styled.p`
  margin-bottom: 2px;
  font-weight: bold;
  font-size: 20px;
  color: #000;
  text-transform: capitalize;
`;
export const LastMsg = styled.p`
  color: #000;

  @media screen and (max-width: 769px) {
    font-size: 22px;
  }
`;
export const LastMsgTime = styled.p`
  color: #fff;
`;

export const UserListIcon = styled(Link)`
  position: fixed;
  bottom: 30px;
  right: 50px;
  background-color: #22eaaa;
  padding: 10px;
  border-radius: 100px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const User = styled.div`
  width:50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
