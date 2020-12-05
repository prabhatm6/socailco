import React, { forwardRef } from "react";
import "../styles/Comment.css";
import CloseIcon from "@material-ui/icons/Close";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { Avatar } from "@material-ui/core";
import { createComment, singleTweet } from "../Actions";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

const Comment = forwardRef(
  ({ createComment, singleTweet, Curpostid, curuser, post }, ref) => {
    const userid = localStorage.getItem("id");
    const postid = useParams().postid;
    const [comment, setComment] = React.useState("");

    const close = () => {
      ref.current.style.display = "none";
    };

    const submitComment = () => {
      createComment(postid, userid, comment);
      setTimeout(() => {
        singleTweet(postid);
      }, 2000);
      setComment("");
      setTimeout(() => {
        ref.current.style.display = "none";
      }, 1000);
    };
    return (
      <>
        {post && curuser ? (
          <div className="comment__container" ref={ref}>
            <div className="comment__modal">
              <div className="back" onClick={close}>
                <CloseIcon className="closeicon" />
              </div>

              <div className="user">
                <div className="user__avtar">
                  {post.postedBy.coverphoto ? (
                    <Avatar
                      className="comment__avtar"
                      src={post.postedBy.coverphoto}
                    />
                  ) : (
                    <Avatar className="comment__avtar" />
                  )}
                </div>
                <div className="user__info">
                  <p>
                    {post.postedBy.firstname}{" "}
                    <span>@{post.postedBy.username}</span>
                  </p>
                  <p>{post.caption}</p>
                  <p>Replying to @{post.postedBy.username}</p>
                </div>
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="comment__form"
              >
                <div className="comment-box">
                  {curuser.coverphoto ? (
                    <Avatar
                      className="comment__avtar"
                      src={curuser.coverphoto}
                    />
                  ) : (
                    <Avatar className="comment__avtar" />
                  )}
                  <textarea
                    type="text"
                    cols="40"
                    rows="5"
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tweet your reply"
                  />
                </div>
              </form>

              <div className="comment__actions">
                <label>
                  <input type="file" style={{ display: "none" }} />
                  <AttachFileIcon className="comment__file" />
                </label>
                <button onClick={submitComment} className="comment__cta">
                  Reply
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
);

const mapStateToProps = (state) => {
  return {
    post: state.info.singlepost,
    curuser: state.auth.curuser,
  };
};

export default connect(mapStateToProps, { createComment, singleTweet }, null, {
  forwardRef: true,
})(Comment);
