import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import axios from "axios";
import "./profile.css";
import Nav from "../../components/nav/Nav";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
export default function Profile() {
  const [user, setUser] = useState({});
  const {
    user: userCurrent,
    addGiveRequests,
    cancelGiveRequests,
    setIsOpenReq,
    comfirmAddFriend,
    cancelReqAdd,
    deleteFriend,
  } = useGlobalContext();
  const userId = useParams().id;
  const [isSendreq, setIsSendReq] = useState(
    userCurrent.giveRequests.includes(userId)
  );
  useEffect(() => {
    const fetchUser = async () => {
      setUser({});
      try {
        const res = await axios.get(`/users/${userId}`);
        setUser(res.data);
      } catch (err) {}
    };
    fetchUser();
  }, [userId]);
  const handleSendRequest = async () => {
    if (!isSendreq) {
      try {
        await axios.put(`/users/${user._id}/request`, {
          userId: userCurrent._id,
        });
      } catch (err) {
        console.log(err);
      }
      addGiveRequests(userId);
    } else {
      try {
        await axios.put(`/users/${user._id}/unRequest`, {
          userId: userCurrent._id,
        });
      } catch (err) {
        console.log(err);
      }
      cancelGiveRequests(userId);
    }
    setIsSendReq(!isSendreq);
  };
  const handleDeleteFriend = async () => {
    try {
      await axios.put(`/users/${userId}/delete`, { id: userCurrent._id });
    } catch (err) {
      console.log(err);
    }
    deleteFriend(userId);
  };
  const handleComfirmAdd = async () => {
    comfirmAddFriend(userId);
    try {
      const res = await axios.put(`/users/${userId}/confirmReq`, {
        id: userCurrent._id,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleCancelReq = async () => {
    cancelReqAdd(userId);
    try {
      await axios.put(`/users/${userId}/rejectReq`, { id: userCurrent._id });
    } catch (err) {
      console.log("co loi");
    }
  };
  return (
    <div className="profileWraper" onClick={() => setIsOpenReq(false)}>
      <Nav />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <img
              className="imgCoverUser"
              src="https://vcdn1-vnexpress.vnecdn.net/2019/09/29/2-1569755302.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=eIlnCLgSWVtioKgU4I4VzA"
            />
            <img
              className="imgMainUser"
              src="https://photo-cms-tpo.zadn.vn/Uploaded/2022/bqmvlcvo/2020_01_16/ong_co_ngu_khong_WZUE.gif"
            />
            <h2 className="name-user-profile">{user.fullname}</h2>
            <div className="btns-friend">
              {userCurrent._id !== userId ? (
                userCurrent.friends.includes(userId) ? (
                  <Button
                    variant="contained"
                    sx={{ textTransform: "capitalize", width: 120, pl: 0 }}
                    startIcon={
                      <ClearIcon
                        sx={{ color: "red" }}
                        onClick={() => {
                          const isDelete = window.confirm("Xóa hả");
                          if (isDelete) handleDeleteFriend();
                        }}
                      />
                    }
                  >
                    bạn bè
                  </Button>
                ) : userCurrent.getRequests.includes(userId) ? (
                  <div className="btns-confirm">
                    <Button
                      variant="contained"
                      sx={{ width: 130 }}
                      onClick={handleComfirmAdd}
                    >
                      Confirm
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ ml: 2, width: 130 }}
                      onClick={handleCancelReq}
                    >
                      Reject
                    </Button>
                  </div>
                ) : !isSendreq ? (
                  <Button
                    variant="contained"
                    sx={{ textTransform: "capitalize" }}
                    onClick={handleSendRequest}
                  >
                    add friend
                  </Button>
                ) : (
                  <Button variant="outlined" onClick={handleSendRequest}>
                    request sended
                  </Button>
                )
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar />
          </div>
        </div>
      </div>
    </div>
  );
}
