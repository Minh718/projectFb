import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/context";
import axios from "axios";
import Online from "../online/Online";
import { Link, useParams } from "react-router-dom";
import "./rightbar.css";
export default function Rightbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const userId = useParams().id;
  const { user } = useGlobalContext();
  const [friendOnls, setFriendOnls] = useState([]);
  useEffect(() => {
    setFriendOnls([]);
    const fetchFriend = async () => {
      try {
        const res = userId
          ? await axios.get(`/users/${userId}/friends`)
          : await axios.get(`/users/${user._id}/friends`);
        setFriendOnls(res.data);
      } catch (err) {
        console.log(err.response);
      }
    };
    fetchFriend();
  }, [user, userId]);
  const HomeRightBar = () => {
    return (
      <>
        <div className="rightbar-friends-birthday">
          <img src="assets/gift.png" />
          <p>
            <b>Pola Foster</b> and <b>3 other friends </b>have a birhday today.
          </p>
        </div>
        <img src="./assets/ad.png" className="img-ad" />
        <div className="friendOnline">
          <h3>Online Friends</h3>
          {friendOnls.map((friendOnl) => {
            return <Online key={friendOnl._id} friendOnl={friendOnl} />;
          })}
        </div>
      </>
    );
  };
  const ProfileRightBar = () => {
    return (
      <>
        <h3 className="titleListFriends">Danh sách bạn bè</h3>
        <div className="listFriends">
          {friendOnls.map((friendOnl) => {
            return (
              <div className="personInList" key={friendOnl._id}>
                <Link to={`/profile/${friendOnl._id}`}>
                  <img
                    src={
                      friendOnl.profilePicture
                        ? PF + `person/${friendOnl.profilePicture}`
                        : PF + "person/noAvatar.png"
                    }
                  />
                </Link>
                <p>{friendOnl.fullname}</p>
              </div>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="container-rightbar">
        {userId ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
}
