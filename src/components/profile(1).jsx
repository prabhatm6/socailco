<div className="profilemain">
  <form className="profile__form">
    <div className="profile__container">
      <div>
        <img src="https://pbs.twimg.com/media/EDnLATGW4AIOsnS.jpg" />
        <label>
          <p>
            add Cover image <AddAPhotoIcon />
          </p>
          <input type="file" style={{ display: "none" }} />
        </label>
      </div>
      <div>
        <img src="https://pbs.twimg.com/media/EDnLATGW4AIOsnS.jpg" />
        <label>
          <p>
            add Cover image <AddAPhotoIcon />
          </p>
          <input type="file" style={{ display: "none" }} />
        </label>
      </div>
    </div>

    <div className="profile__edit">
      <div>
        <label>Edit firstname</label>
        <input type="text" value={curUserData.firstname} />
      </div>
      <div>
        <label>Edit lastname</label>
        <input type="text" value={curUserData.lastname} />
      </div>
      <button>save</button>
    </div>
  </form>
</div>;
