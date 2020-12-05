import React, { useRef } from "react";
import "../styles/Post.css";
import { Avatar } from "@material-ui/core";
import Comment from "./Comment";
import DeleteIcon from "@material-ui/icons/Delete";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { deleteTweet, fetchData } from "../Actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  VerifiedUser,
  ChatBubbleOutline,
  Repeat,
  FavoriteBorder,
  Publish,
} from "@material-ui/icons";

const Post = ({
  displayName,
  username,
  verified,
  text,
  image,
  userid,
  postid,
  deleteTweet,
  fetchData,
}) => {
  const handleDelete = (id) => {
    deleteTweet(id);
    setTimeout(() => {
      fetchData();
    }, 1000);
  };
  const comment = useRef(null);
  const curlogUser = localStorage.getItem("id");

  // const show = () => {
  //   comment.current.style.display = "block";
  // }

  return (
    <div className="post" key={username}>
      {/* <Comment ref={comment} /> */}
        <div className="post__avatar">
          <Avatar src="https://pbs.twimg.com/profile_images/805555505062182912/ECGopboq_400x400.jpg" />
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <Link to={`/profile/${userid}`}>
                {displayName}{" "}
                <span className="post__headerSpecial">
                  {" "}
                  {verified && <VerifiedUser className="post__badge" />}{" "}
                  {username}
                </span>
              </Link>
              {userid === curlogUser ? (
                <div onClick={() => handleDelete(postid)}>
                  <DeleteIcon className="deleteIcon" />
                  <DeleteOutlineIcon className="outlinedeleteIcon outlined" />
                </div>
              ) : null}
            </div>
            <div className="post__headerDescription">
              <Link to={`/overview/${postid}`}>{text}</Link>
            </div>
          </div>
          {image ? (
            <div className="post__img">
              <img
                src={
                  image ||
                  "https://www.verdict.co.uk/wp-content/uploads/2017/09/giphy-downsized-large.gif"
                }
                alt="img"
              />
            </div>
          ) : null}
          <div className="post__footer">
            <div>
              <ChatBubbleOutline fontSize="small" />
            </div>
            <Repeat fontSize="small" />
            <FavoriteBorder fontSize="small" />
            <Publish fontSize="small" />
          </div>
        </div>
    </div>
  );
};

export default connect(null, { deleteTweet, fetchData })(Post);
