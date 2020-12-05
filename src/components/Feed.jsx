import React, { useEffect, useState } from "react";
import TweetBox from "./Tweetbox";
import "../styles/Feed.css";
import { connect } from "react-redux";
import { fetchData, } from "../Actions";
import Tweet from './Tweet';
import Comment from './Comment';

function Feed({ fetchData, user }) {
  const commentRef = React.useRef();

  const [loading, setloading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);
  const userData = user.usersFeed;
  const renderTweets = (user) => {
    return user.posts.map((tweet) => {
      return (
        <Tweet
          key={tweet._id}
          firstname={tweet.postedBy.firstname}
          verified={user.verified}
          image={tweet.post}
          cover={tweet.postedBy.coverphoto}
          username={`${tweet.postedBy.username}`}
          caption={tweet.caption}
          postid={tweet._id}
          userid={tweet.postedBy._id}
        />
      );
    });
  };
  return (
    <div className="feed">
        <Comment ref={commentRef} />
        <div className="header">
          <p>Home</p>
        </div>
        <TweetBox />
        {
          userData ? renderTweets(userData).reverse() : 'loading'
        }
      </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps, { fetchData })(Feed);
