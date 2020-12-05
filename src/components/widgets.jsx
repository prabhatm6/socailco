import React, { useRef } from "react";
import SearchIcon from "@material-ui/icons/Search";
import "../styles/widgets.css";
import { Link } from "react-router-dom";
import { fetchAllUsers } from "../Actions";
import { connect } from "react-redux";

class Widgets extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
    };
  }
  resultRef = React.createRef();
  componentDidMount() {
    this.props.fetchAllUsers();
  }

  renderSearchedUser = () => {
    const curuserId = localStorage.getItem('id');
    const { username } = this.state;
    this._regex = new RegExp(`^${username}|.${username}`, "i");
    const { allusers } = this.props.userData;
    return allusers.filter((user) => {
      return this._regex.test(user.username) && user.id != curuserId;
    });
  };

  renderUser = () => {
    if (this.state.username) {
      if (this.renderSearchedUser().length === 0) {
        return <p className="result__none">no user found</p>;
      } else {
        return this.renderSearchedUser().map((user) => {
          return (
            <div className="result__body">
              <img
                className="result__img"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSyD8xT3wqAu9pnVqH5CiK7qToEpiKa7MOyVg&usqp=CAU"
                alt=""
              />
              <div className="result__info">
                <Link className="result__name" to={`/profile/${user.id}`}>
                  {user.firstname + " " + user.lastname}
                </Link>
                <Link className="result__username" to="#">
                 {user.username}
                </Link>
              </div>
            </div>
          );
        });
      }
    }
  };

  modifierClassname = () => {
    if (!this.state.username) {
      return "result__modal-hide";
    } else {
      return "result__modal-show";
    }
  };
  render() {
    return (
      <div className="widgets">
        <form action="#">
          <div className="widgets__in">
            <svg className="widgets__searchicon">
              <SearchIcon />
            </svg>
            <input
              className="widgets__searchbar"
              value={this.state.username}
              onChange={(e) => this.setState({ username: e.target.value })}
              type="text"
              placeholder="Search Users"
            />
          </div>
        </form>

        <div className={this.modifierClassname()} ref={this.resultRef}>
          {this.props.userData.length === 0 ?  <p>loading</p> : this.renderUser()}
        </div>

        {/* <div className="info">
          <p className="info__header">What's happening</p>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.info,
  };
};

export default connect(mapStateToProps, { fetchAllUsers })(Widgets);
