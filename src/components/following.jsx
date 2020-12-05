import React from "react";
import { connect } from "react-redux";
import {
  fetchFollowings,
  fetchFollowers,
  unfollow,
  fetchData,
  follow,
} from "../Actions";
import { Link, useParams } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import "../styles/Follow.css";

const Following = ({
  fetchFollowings,
  followingData,
  userData,
  fetchFollowers,
  unfollow,
  follow,
}) => {
  const CurProfileid = useParams().userid;
  const userid = localStorage.getItem("id");

  React.useEffect(() => {
    fetchFollowings(CurProfileid);
  }, []);

  const unfollowUser = (id) => {
    unfollow(id, userid);
    setTimeout(() => {
      fetchFollowings(userid);
    }, 2000);
  };

  const followFilter = (id) => {
    return userData.followings.includes(id);
  };

  const renderButton = (id) => {
    if (CurProfileid == userid) {
      return (
        <button onClick={() => unfollowUser(id)} className="unfollow">
          unfollow
        </button>
      );
    } else if (userid === id) {
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
          <button onClick={() => follow(id)} className="follow">
            follow
          </button>
        );
      }
    }
  };

  const renderFollowings = (data) => {
    return data.followings.length === 0 ? (
      <p>No data</p>
    ) : (
      data.followings.map((following) => {
        return (
          <div className="followinfo__main">
            <div class="followinfo__profile">
              <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSyD8xT3wqAu9pnVqH5CiK7qToEpiKa7MOyVg&usqp=CAU" />
            </div>

            <div class="followinfo__body">
              <div class="top">
                <div class="naming">
                  <Link to={`/profile/${following.id}`} class="naming__name">
                    {following.username}{" "}
                  </Link>
                  <p class="naming__username">@jamesBond123</p>
                </div>

                <div class="info__btn">{renderButton(following.id)}</div>
              </div>
              <p class="user__caption">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam
                molestias harum cupiditate tempore id? Impedit atque quas
                architecto quasi sapiente dignissimos sequi rerum soluta? Quis
              </p>
            </div>
          </div>
        );
      })
    );
  };

  return (
    <div class="followinfo__container">
      <div className="profilefollow__header">
        <p className="firstname">prabhat</p>
        <p className="tweets">followings</p>
      </div>

      <div class="profilefollow__body">
        {followingData.followings && userData
          ? renderFollowings(followingData)
          : "loading"}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    followingData: state.info,
    userData: state.auth.curuser,
  };
};

export default connect(mapStateToProps, {
  fetchFollowings,
  fetchFollowers,
  follow,
  unfollow,
})(Following);
