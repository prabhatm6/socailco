import styled from "styled-components";
import { Link } from 'react-router-dom'

export const MsgContainer = styled.div`
  display: flex;
  flex: 16%;
`;

export const MsgBox = styled.div`
  display: flex;
  width: 100%;
`;
export const Contacts = styled.div`
  width: 32%;
`;
export const ContactHeader = styled.div`
  padding: 10px;
`;

export const ContactH2 = styled.h2`
  text-align: center;
`;
export const ContactBox = styled.div`
  margin-top: 20px;
  overflow-y:scroll;

  display:flex;
  flex-direction:column;
  align-items:center;
`;
export const ContactRow = styled(Link)`
  width:80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding:10px 0;
  border-bottom:2px solid lightgrey;
`;

export const ContactP = styled.p`
    font-size:20px;
`;

export const MsgBody = styled.div`
  flex: 1;
  background-color: yellow;
`;
