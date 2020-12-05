import React from "react";
import { connect } from "react-redux";
import { fetchUser, deleteTweet, fetchData } from "../Actions";
import { Link, useParams } from "react-router-dom";
import Post from "./Post";
import Tweet from "./Tweet";
import "../styles/Profile.css";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Widgets from "./widgets";

function Profile({ userData, fetchUser, userFeed, fetchData }) {
  const userid = localStorage.getItem("id");
  const params = useParams();
  React.useEffect(() => {
    fetchUser(params.userid);
    fetchData(userid);
  }, [params]);

  const followFilter = (id) => {
    return userFeed.curuser.followings.includes(id);
  };

  const filterPosts = () => {
    return userFeed.usersFeed.posts.filter((feed) => {
      return userid === feed.postedBy.id;
    });
  };

  const renderPosts = () => {
    return userid === params.userid
      ? filterPosts().map((post) => {
          return (
            <Tweet
              firstname={post.postedBy.firstname}
              lastname={post.postedBy.lastname}
              image={post.post}
              caption={post.caption}
              userid={post.postedBy.id}
              postid={post._id}
              cover={post.postedBy.coverphoto}
              username={`${post.postedBy.username}`}
            />
          );
        })
      : null;
  };

  return (
    <>
      <div className="profile">
        {userData.user && userFeed.usersFeed ? (
          <>
            <div className="profile__header">
              <p className="name">{userData.user.firstname}</p>
              <p className="tweets">{filterPosts().length} tweets</p>
            </div>
            <div className="profile__body">
              <div className="media">
                <div className="profile__cover">
                  {userData.user.coverphoto ? (
                    <img src={userData.user.coverphoto} />
                  ) : (
                    <img src="https://pbs.twimg.com/media/EDnLATGW4AIOsnS.jpg" />
                  )}
                </div>
                {userData.user.gender == "male" ? (
                  <img
                    className="avtar"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSyD8xT3wqAu9pnVqH5CiK7qToEpiKa7MOyVg&usqp=CAU"
                    alt="avtar"
                  />
                ) : (
                  <img
                    className="avtar"
                    src="https://www.kindpng.com/picc/m/163-1636340_user-avatar-icon-avatar-transparent-user-icon-png.png "
                    alt="avtar"
                  />
                )}
                {userid == params.userid ? (
                  <Link to={`/setprofile/${userid}`} className="profile__btn">
                    Set Up Profile
                  </Link>
                ) : (
                  <button className="profile__btn">
                    {followFilter(params.userid) ? "following" : "follow"}
                  </button>
                )}
              </div>
              <div className="profile__info">
                <p className="name">
                  {userData.user.firstname + " " + userData.user.lastname}
                </p>
                <p className="username">@{userData.user.username}</p>
                <p className="date">
                  <CalendarTodayIcon className="date__icon" /> joined{" "}
                  {new Date(
                    userData.user.createdAt
                  ).toLocaleDateString("default", { month: "long" })}{" "}
                  {new Date(userData.user.createdAt).getFullYear()}
                </p>
                <div className="friends">
                  <Link to={`/followers/${userData.user.id}`}>
                    {userData.user.followers.length} followers
                  </Link>
                  <Link to={`/followings/${userData.user.id}`}>
                    {userData.user.followings.length} followings
                  </Link>
                </div>
              </div>
            </div>

            {userFeed.usersFeed && userFeed.curuser ? renderPosts() : "loading"}
          </>
        ) : (
          "loading"
        )}
      </div>
      <Widgets />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.info,
    userFeed: state.auth,
  };
};

export default connect(mapStateToProps, { fetchUser, deleteTweet, fetchData })(
  Profile
);
