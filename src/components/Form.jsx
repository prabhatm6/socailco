import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../Actions";
import { connect } from "react-redux";
import social from '../img/social.svg';
import "../styles/Form.css";

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",

      firstname: "",
      lastname: "",
      signupEmail: "",
      signuppassword: "",
      gender: "",
    };
  }
  closebtnRef = React.createRef();
  signupRef = React.createRef();

  submitHandler = (e, type) => {
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    e.preventDefault();
    this.props.auth(type, data);
  };
  signUpsubmitHandler = (e, type) => {
    e.preventDefault();
    const data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      password: this.state.signuppassword,
      email: this.state.signupEmail,
      gender: this.state.gender,
    };
    this.props.auth(type, data);
  };

  render() {
    const showModal = () => {
      this.signupRef.current.style.display = "flex";
    };
    const hideModal = () => {
      this.signupRef.current.style.display = "none";
    };
    return (
      <>
        <div className="form__container">
          <div className="form__left">
            {/* <h1
              style={{
                fontWeight: "bold",
                fontFamily: "cursive",
                // marginBottom: "-30px",
              }}
            >
              Twitter
            </h1> */}
            <img className="form__left-img" style={{ width:"150px" }} src={social} />
            <h2 className="form__left-heading">share what's happening</h2>
          </div>

          <div className="form__right">
            <form
              className="form"
              onSubmit={(e) => this.submitHandler(e, "signin")}
            >
              <input
                type="text"
                onChange={(e) => this.setState({ username: e.target.value })}
                placeholder="Email or Username"
                value={this.state.username}
                required
              />
              <input
                type="password"
                onChange={(e) => this.setState({ password: e.target.value })}
                placeholder="Password"
                value={this.state.password}
                required
              />
              <button className="form__btn login">Log In</button>
              <Link to="#" className="forgot__btn">
                forgot password?
              </Link>
              <div className="signup__container">
                <p onClick={() => showModal()} className="form__btn-signup">
                  Create New Account
                </p>
              </div>
            </form>
          </div>
        </div>
        <div ref={this.signupRef} className="modal">
          <div className="modal__content">
            <div className="modal__header">
              <h2>Sign Up</h2>
              <p
                ref={this.closebtnRef}
                onClick={() => hideModal()}
                className="close"
              >
                +
              </p>
            </div>
            <form
              onSubmit={(e) => this.signUpsubmitHandler(e, "signup")}
              className="modal__form"
            >
              <div className="form__two-in">
                <input
                  type="text"
                  onChange={(e) => this.setState({ firstname: e.target.value })}
                  placeholder="First Name"
                  value={this.state.firstname}
                  required
                />
                <input
                  type="text"
                  onChange={(e) => this.setState({ lastname: e.target.value })}
                  placeholder="Last Name"
                  value={this.state.lastname}
                  required
                />
              </div>
              <input
                type="email"
                onChange={(e) => this.setState({ signupEmail: e.target.value })}
                value={this.state.signupEmail}
                placeholder="E-Mail"
              />
              <input
                type="password"
                onChange={(e) =>
                  this.setState({ signuppassword: e.target.value })
                }
                placeholder="New Password"
                value={this.state.signuppassword}
                required
              />
              <div className="form__gender">
                <div className="gender__list">
                  <label htmlFor="male">Male</label>
                  <input
                    type="radio"
                    onChange={e => this.setState({ gender:e.target.value })}
                    id="male"
                    value='male'
                    name="gender"
                  />
                </div>
                <div className="gender__list">
                  <label htmlFor="female">Female</label>
                  <input
                    type="radio"
                    id="female"
                    value='female'
                    onChange={e => this.setState({ gender:e.target.value })}
                    name="gender"
                  />
                </div>
                <div className="gender__list">
                  <label htmlFor="other">Other</label>
                  <input
                    type="radio"
                    onChange={e => this.setState({ gender:e.target.value })}
                    id="other"
                    value="Other"
                    name="gender"
                  />
                </div>
              </div>
              <button className="form__modal-btn">Sign Up</button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default connect(null, { auth })(Form);
