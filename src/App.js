import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Form from "./components/Form";
import Following from "./components/following";
import SetProfile from "./components/SetProfile";
import Widgets from "./components/widgets";
import Followers from "./components/follower";
import Explore from "./components/Explore";
import Overview from "./components/TweetOverview";
import Comment from "./components/Comment";
import "./styles/App.css";
import cookie from "js-cookie";
import "./styles/App.css";
import TweetOverview from "./components/TweetOverview";
import Message from "./components/messageSection/Message";
import Chat from "./components/messageSection/chat";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const jwt = cookie.get("jwt");
  return (
    <>
      {jwt ? (
        <div className="container">
          <BrowserRouter>
            <Sidebar />
            <Route path="/" exact component={Home} />
            <Route path="/overview/:postid" exact component={TweetOverview} />
            <Route path="/profile/:userid" exact component={Profile} />
            <Route path="/setprofile/:userid" exact component={SetProfile} />
            <Route path="/followings/:userid" exact component={Following} />
            <Route path="/followers/:userid" exact component={Followers} />
            <Route path="/explore" exact component={Explore} />
            <Route path="/messages" exact component={Message} />
            <Route path="/chats/:userid" exact component={Chat} />
            {/* <Widgets /> */}
          </BrowserRouter>
        </div>
      ) : (
        <BrowserRouter>
          <Route path="/" exact component={Form} />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
