import React from "react";
import { connect } from "react-redux";
import { fetchFollowers, fetchCurUser, follow, unfollow } from "../Actions";
import { Link, useParams } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import "../styles/Follow.css";

const Follower = ({
  fetchFollowers,
  fetchCurUser,
  userData,
  followerData,
  follow,
  unfollow,
}) => {
  const userid = localStorage.getItem("id");
  const params = useParams();
  React.useEffect(() => {
    fetchFollowers(params.userid);
    fetchCurUser(userid);
  }, []);

  const followFilter = (id) => {
    return userData.followings.includes(id);
  };

  const followUser = (followid) => {
    follow(followid, userid);
    setTimeout(() => {
      fetchCurUser(userid);
    }, 1000);
  };
  const unfollowUser = (unfollowid) => {
    unfollow(unfollowid, userid);
    setTimeout(() => {
      fetchCurUser(userid);
    }, 1000);
  };

  const renderButton = (id) => {
    if (id == userid) {
      return null;
    } else {
      if (followFilter(id)) {
        return (
          <button onClick={() => unfollowUser(id)} className="unfollow">
            following
          </button>
        );
      } else {
        return (
          <button onClick={() => followUser(id)} className="follow">
            follow
          </button>
        );
      }
    }
  };

  const renderFollowers = (data) => {
    return data.followers.map((follower) => {
      return (
        <div className="followinfo__main">
          <div className="followinfo__profile">
            <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSyD8xT3wqAu9pnVqH5CiK7qToEpiKa7MOyVg&usqp=CAU" />
          </div>

          <div className="followinfo__body">
            <div className="top">
              <div className="naming">
                <Link to={`/profile/${follower.id}`} className="naming__name">
                  {follower.firstname}{" "}
                </Link>
                <p className="naming__username">@{follower.username}</p>
              </div>

              <div className="info__btn">
                {renderButton(follower.id)}
              </div>
            </div>
            <p className="user__caption">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam
              molestias harum cupiditate tempore id? Impedit atque quas
            </p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="followinfo__container">
      <div className="profilefollow__header">
        <p className="firstname">prabhat</p>
        <p className="tweets">followers</p>
      </div>

      <div className="profilefollow__body">
        {followerData.followers && userData
          ? renderFollowers(followerData)
          : "loading"}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    followerData: state.info,
    userData: state.auth.curuser,
  };
};

export default connect(mapStateToProps, {
  fetchFollowers,
  fetchCurUser,
  follow,
  unfollow,
})(Follower);
