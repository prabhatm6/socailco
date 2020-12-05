import React from "react";
import SidebarOption from "./SidebarOptions";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Explore";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button } from "@material-ui/core";
import "../styles/Sidebar.css";
import { MessageOutlined, More } from "@material-ui/icons";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import { fetchCurUser, logout } from "../Actions";
import { connect } from "react-redux";
import social from '../img/social.svg';

function Sidebar({ fetchCurUser, loggedIn, logout }) {
  const userid = localStorage.getItem("id");
  React.useEffect(() => {
    fetchCurUser(userid);
  }, []);
  return (
    <div className="sidebar">
      <div className="icon__header">
        <img src={social} className="twitter-icon" />
      </div>
      <ul className="sidebar__menu">
        <li className="sidebar__item">
          <Link to="/">
            {" "}
            <HomeIcon />
            Home
          </Link>
        </li>
        {/* <li className="sidebar__item">
          <Link to="/explore">
            <ExploreIcon /> Explore
          </Link>
        </li> */}
        <li className="sidebar__item">
          <Link href="#">
            <NotificationsIcon />
            Notifications
          </Link>
        </li>
        <li className="sidebar__item">
          <Link to="/messages/">
            <MessageOutlined />
            Messages
          </Link>
        </li>
        <li className="sidebar__item">
          <Link to={`/profile/${userid}`}>
            <PermIdentityIcon />
            Profile
          </Link>
        </li>
        <Link to={`/profile/${userid}`} className="sidebar__profilebtn">
          <figure className="user__profile">
            <img
              src="http://res.cloudinary.com/prm45/image/upload/v1601717732/epkc3hbuwqn8kwlemeqt.jpg"
              alt="hello"
            />
          </figure>
          <p>prabhat</p>
        </Link>

        <button onClick={logout} className="sidebar__logout">
          Log out
        </button>
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.curuser,
  };
};

export default connect(mapStateToProps, { fetchCurUser, logout })(Sidebar);
