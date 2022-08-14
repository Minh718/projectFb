import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./style.css";
import { useGlobalContext } from "../../context/context";
import { Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
export default function Reqsfriend() {
  const {
    user: userCurrent,
    comfirmAddFriend,
    setIsOpenReq,
    cancelReqAdd,
  } = useGlobalContext();
  const [userReqs, setUserRes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const message = useRef();
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
  const handleCancelReq = async (userId) => {
    message.current.innerHTML = "Yêu cầu đã được từ chối";
    cancelReqAdd(userId);
    try {
      await axios.put(`/users/${userId}/rejectReq`, { id: userCurrent._id });
    } catch (err) {
      console.log("co loi");
    }
  };
  useEffect(() => {
    const fetchReqs = async () => {
      try {
        const res = await axios.get(`/users/${userCurrent._id}/getRequests`);
        setUserRes(res.data);
        setIsLoading(false);
      } catch (err) {}
    };
    fetchReqs();
  }, []);
  if (isLoading) {
    return (
      <div className="container-reqs2">
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      <ul className="container-reqs" onClick={(e) => e.stopPropagation()}>
        <h2>Lời mời kết bạn</h2>
        {userReqs.length !== 0 ? (
          userReqs.map((userReq) => {
            return (
              <li key={userReq._id}>
                <Link to={`/profile/${userReq._id}`}>
                  <img
                    className="avatarPerson reqsLeft"
                    src="https://cdt.org/wp-content/uploads/2015/10/2015-10-06-FB-person_sq.png"
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
          })
        ) : (
          <p>Không có lời kết bạn nào</p>
        )}
      </ul>
    </>
  );
}
