import React from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import "../styles/CommentBox.css";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { Chat } from "@material-ui/icons";
import {
  VerifiedUser,
  Repeat,
  Publish,
} from "@material-ui/icons";
import { purple } from "@material-ui/core/colors";

const Tweet = ({
  comment,
  firstname,
  lastname,
  username,
  cover,
  userid,
  image,
  postid
}) => {
  return (
    <div className="comment">
      <div className="comment__box">
        {cover ? (
          <Avatar
            className="overview__avtar"
            src="http://res.cloudinary.com/prm45/image/upload/v1600795896/u5rrqujw2ji7kwq9oecj.jpg"
          />
        ) : (
          <Avatar className="overview__avtar" />
        )}
        <div className="comment__body">
          <div className="comment__top">
            <Link to={`/profile/${userid}`} className="comment__name">
              {firstname}{lastname&&lastname} {" "} 
            </Link><span>@{username}</span>
          </div>
          <div className="comment__text">
        <p>{comment}</p>
          </div>
          {image ? (
            <div className="comment__media">
              <img src={image} />
            </div>
          ) : null}
        </div>
      </div>
      {/* <div className="tweet__actions">
        <ChatBubbleOutlineIcon />
        <FavoriteBorderIcon />
        <Repeat />
      </div> */}
    </div>
  );
};

export default Tweet;
