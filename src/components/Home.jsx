import React, { useEffect } from "react";
import { connect } from "react-redux";
import SideBar from "./Sidebar";
import Feed from "./Feed";
// import { Widgets } from "@material-ui/icons";
import Widgets from "./widgets";

function Home({ fetchData, user }) {
  return (
    <>
      <Feed />
      <Widgets />
    </>
  );
}

export default Home;
