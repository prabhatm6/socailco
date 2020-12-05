import React, { useState } from "react";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import EditIcon from "@material-ui/icons/Edit";
import { updateUser, fetchUser } from "../Actions";
import { connect } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import "../styles/SetProfile.css";
import uikit from "uikit";

function SetProfile({ curUserData, updateUser, fetchUser }) {
  const userid = useParams().userid;

  React.useEffect(() => {
    fetchUser(userid);
  }, []);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [coverphoto, setCoverphoto] = useState("");
  const [profilephoto, setProfilephoto] = useState("");
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  const history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData();
    form.append("firstname", firstname);
    form.append("lastname", lastname);
    form.append("coverphoto", coverphoto);
    updateUser(userid, form);
    setTimeout(() => {
      fetchUser(userid);
    }, 2000);
    uikit.notification("updated", "success");
    setTimeout(() => {
      history.push(`/profile/${userid}`);
      setLoading(false);
    }, 3000);
  };
  return (
    <div className="setprofile">
      <div>
        <h2 className="setprofile__header">Edit profile</h2>
      </div>
      {curUserData ? (
        <div className="profilemain">
          <form onSubmit={(e) => submitHandler(e)} className="profile__form">
            <div className="profile__container">
              {/* <div> */}
                {curUserData.coverphoto ? (
                  <img src={curUserData.coverphoto} />
                ) : (
                  <img src="https://pbs.twimg.com/media/EDnLATGW4AIOsnS.jpg" />
                )}
                <label>
                  {!curUserData.coverphoto ? (
                    <p>
                      <AddAPhotoIcon /> add cover image
                    </p>
                  ) : (
                    <p>
                      <EditIcon /> Edit cover image
                    </p>
                  )}
                  <input
                    type="file"
                    onChange={(e) => setCoverphoto(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </label>
                <h3>{coverphoto.name}</h3>
              {/* </div> */}
              <div>
                <h3>{profilephoto.name}</h3>
              </div>
            </div>

            <div className="profile__edit">
              <div>
                <label>Edit firstname</label>
                <input
                  onChange={(e) => setFirstname(e.target.value)}
                  type="text"
                  value={firstname}
                />
              </div>
              <div>
                <label>Edit lastname</label>
                <input
                  onChange={(e) => setLastname(e.target.value)}
                  type="text"
                  value={lastname}
                />
              </div>
              {/* <div>
                <label>Edit Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  value={email}
                />
              </div> */}
              <button>save</button>
            </div>
          </form>
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    curUserData: state.info.user,
  };
};

export default connect(mapStateToProps, { updateUser, fetchUser })(SetProfile);
