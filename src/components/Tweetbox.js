import React, { useState } from "react";
import { Avatar, Button } from "@material-ui/core";
import "../styles/Tweetbox.css";
import { connect } from "react-redux";
import { addTweet, fetchData } from "../Actions";
import axios from "axios";
import AttachFileIcon from "@material-ui/icons/AttachFile";

function Tweetbox(props) {
  const [tweet, setTweet] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData();
    form.append("caption", tweet);
    form.append("post", image);
    props.addTweet(form);
    setTimeout(() => {
      setTweet("");
      setImage("");
      setLoading(false);
    }, 1000);
  };
  return (
    <form className="tweetbox" onSubmit={(e) => submitHandler(e)}>
      <div className="upper">
        <figure className="avtar">
          {/* <!-- if user is female display this icon as default --> */}
          {/* <!-- https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png --> */}
          <img src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png" />
        </figure>
        <input
          type="text"
          onChange={(e) => setTweet(e.target.value)}
          placeholder="What's happening?"
          value={tweet}
        />
      </div>
      <div className="lower">
        <label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <div className="icon">
            <svg className="feed-icon">
              <AttachFileIcon />
            </svg>
            {image ? image.name : null}
          </div>
        </label>
        <img className="tweetbox-img__preview" src={image} alt="" />
        {tweet !== "" ? (
          <button className="tweet__btn">
            Post
            {loading ? <span className="spinner"></span> : null}
          </button>
        ) : (
          <button className="tweet__btn" style={{ cursor:"not-allowed" }} disabled>
            Post
          </button>
        )}
      </div>
    </form>
  );
}
export default connect(null, { addTweet, fetchData })(Tweetbox);
