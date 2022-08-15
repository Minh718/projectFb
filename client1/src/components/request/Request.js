import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import axios from "axios";
import { Button } from "@mui/material";
export default function Request({ userReq }) {
  const {
    user: userCurrent,
    comfirmAddFriend,
    setIsOpenReq,
    cancelReqAdd,
  } = useGlobalContext();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const message = useRef();
  const handleCancelReq = async (userId) => {
    message.current.innerHTML = "Yêu cầu đã được từ chối";
    cancelReqAdd(userId);
    try {
      await axios.put(`/users/${userId}/rejectReq`, { id: userCurrent._id });
    } catch (err) {
      console.log("co loi");
    }
  };
  const handleComfirmAdd = async (userId) => {
    message.current.innerHTML = "You agreed request";
    comfirmAddFriend(userId);
    try {
      const res = await axios.put(`/users/${userId}/confirmReq`, {
        id: userCurrent._id,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <li>
      <Link to={`/profile/${userReq._id}`}>
        <img
          className="avatarPerson reqsLeft"
          src={
            userReq.profilePicture
              ? PF + `person/${userReq.profilePicture}`
              : PF + "person/noAvatar.png"
          }
          onClick={() => setIsOpenReq(false)}
        />
      </Link>
      <div className="reqsRight">
        <div className="info-user-req">
          <h3>{userReq.fullname}</h3>
          <p>49 weeks</p>
        </div>
        <div className="btns-confirm" ref={message}>
          <Button
            variant="contained"
            sx={{ width: 130 }}
            onClick={() => handleComfirmAdd(userReq._id)}
          >
            Confirm
          </Button>
          <Button
            variant="outlined"
            sx={{ ml: 2, width: 130 }}
            onClick={() => handleCancelReq(userReq._id)}
          >
            Reject
          </Button>
        </div>
      </div>
    </li>
  );
}
