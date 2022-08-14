import React from "react";

export default function Friendcloset({ user }) {
  const { username } = user;
  return (
    <li>
      <img
        className="avatarPerson"
        src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-image-icon-default-avatar-profile-icon-social-media-user-vector-image-209162840.jpg"
      />
      {username}
    </li>
  );
}
