import React from "react";
import { Avatar } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import Tweet from "./Tweet";
import "../styles/Overview.css";
import { useParams } from "react-router-dom";
import { singleTweet, createLike, removeLike } from "../Actions";
import { connect } from "react-redux";
import CommentBox from "./Comment";
import CommentDetails from "./commentBox";
import Widget from "./widgets";

const TweetOverview = ({ singleTweet, removeLike, post, createLike }) => {
  const postid = useParams().postid;
  const userid = localStorage.getItem("id");

  const commentRef = React.useRef();
  React.useEffect(() => {
    singleTweet(postid);
  }, []);

  const renderComment = (comments) => {
    return comments.map((comment) => {
      return (
        <CommentDetails
          comment={comment.comment}
          firstname={comment.postedBy.firstname}
          username={comment.postedBy.username}
          cover={comment.postedBy.coverphoto}
          userid={comment.postedBy.id}
        />
      );
    });
  };

  const show = () => {
    commentRef.current.style.display = "block";
  };

  const likeFilter = (likes) => {
    return likes.includes(userid);
  };

  return (
    <div className="root__container">
      <div className="overview">
        <CommentBox Curpostid={postid} ref={commentRef} />
        {post ? (
          <>
            <div className="overview__header">
              <p>Tweet</p>
            </div>
            <div className="overview__user">
              {post.postedBy.coverphoto ? (
                <Avatar
                  className="overview__avtar"
                  src={post.postedBy.coverphoto}
                />
              ) : (
                <Avatar
                  className="overview__avtar"
                />
              )}
              <div className="overview__user-desc">
                <p>{post.postedBy.firstname + " " + post.postedBy.lastname}</p>
                <p>@{post.postedBy.username}</p>
              </div>
            </div>
            <div className="overview__info">
              <p className="text">{post.caption}</p>
              {post.post && <img src={post.post} />}
              <div className="overview__details">
                <p className="post-date">
                  {new Date(post.createdAt).getDate()}{" "}
                  {new Date(post.createdAt).toLocaleDateString("default", {
                    month: "long",
                  })}{" "}
                  {new Date(post.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
            <div className="overview__react">
              <div className="overview__respond">
                <p>
                  <span>{post.comments.length}</span> comments
                </p>
                <p>
                  <span>{post.likes.length}</span> Likes
                </p>
              </div>

              <div className="overview__actions">
                <ChatBubbleOutlineIcon onClick={show} />
                {likeFilter(post.likes) ? (
                  <FavoriteBorderIcon
                    onClick={() => {
                      removeLike(postid, userid);
                      setTimeout(() => {
                        singleTweet(postid);
                      }, 1500);
                    }}
                    className="heartIcon-clicked"
                  />
                ) : (
                  <FavoriteBorderIcon
                    onClick={() => {
                      createLike(postid, userid);
                      setTimeout(() => {
                        singleTweet(postid);
                      }, 1500);
                    }}
                    className="heartIcon"
                  />
                )}
                <AutorenewIcon />
              </div>
            </div>
            {renderComment(post.comments)}
          </>
        ) : (
          <p>loading...</p>
        )}
      </div>
      <Widget />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    post: state.info.singlepost,
  };
};
export default connect(mapStateToProps, {
  singleTweet,
  removeLike,
  createLike,
})(TweetOverview);
