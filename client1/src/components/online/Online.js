import React from "react";
import "./online.css";
import { Link } from "react-router-dom";
export default function Online({ friendOnl }) {
  const { fullname, _id, profilePicture } = friendOnl;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <Link to={`/profile/${_id}`}>
      <div className="wraper-friendOnl">
        <div className="wraper-img-friendOnl">
          <img
            className="avatarPerson"
            src={
              profilePicture
                ? PF + `person/${profilePicture}`
                : PF + "person/noAvatar.png"
            }
          />
        </div>
        <p className="name-user-onl">{fullname}</p>
      </div>
    </Link>
  );
}
