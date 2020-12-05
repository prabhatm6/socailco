import React from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import "../styles/Overview.css";
import { Link } from "react-router-dom";
import { deleteTweet, fetchData } from "../Actions";
import { connect } from "react-redux";
import { Avatar } from "@material-ui/core";
import { Chat } from "@material-ui/icons";
import CommnetBox from "./Comment";

import DeleteIcon from "@material-ui/icons/Delete";

const Tweet = ({
  caption,
  firstname,
  lastname,
  username,
  cover,
  userid,
  image,
  postid,
  deleteTweet,
  fetchData
}) => {
  const handleDeletePost = (id) => {
    deleteTweet(id);
    setTimeout(() => {
      console.log('fetching post after 2s');
      fetchData();
    }, 2000);
  };

  const curuserid = localStorage.getItem("id");
  return (
    <div className="tweet__container">
      <Link to={`/overview/${postid}`} className="tweet">
        <div className="tweet__box">
          <Link to={`/profile/${userid}`} className="tweet__profile">
            {cover ? (
              <Avatar
                className="overview__avtar"
                src="http://res.cloudinary.com/prm45/image/upload/v1600795896/u5rrqujw2ji7kwq9oecj.jpg"
              />
            ) : (
              <Avatar className="overview__avtar" />
            )}
            <div className="tweet__top">
              <Link to={`/profile/${userid}`} className="tweet__name">
                {firstname}
                {lastname && lastname}{" "}
              </Link>
              <span>@{username}</span>
            </div>
          </Link>

          <div className="tweet__body">
            <div className="tweets__text">
              <p>{caption}</p>
            </div>
            {image ? (
              <div className="tweet__media">
                <img src={image} />
              </div>
            ) : null}
          </div>
        </div>
      </Link>
      {userid === curuserid ? (
        <DeleteIcon className="tweet__delete" onClick={() => handleDeletePost(postid)} />
      ) : null}
    </div>
  );
};

export default connect(null, { deleteTweet,fetchData })(Tweet);
