import React, { useState } from "react";
import "./nav.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useGlobalContext } from "../../context/context";
import Reqsfriend from "../reqsFriend/Reqsfriend";
import { Button } from "@mui/material";
export default function Nav() {
  const { user, setIsOpenReq, isOpenReq, setUser } = useGlobalContext();
  const [isOpenSetting, setIsOpenSetting] = useState(false);
  return (
    <div className="container-nav">
      <div className="logo-nav">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="name-logo">Lamasocial</span>
        </Link>
      </div>
      <div className="search-nav">
        <SearchIcon fontSize="small" />
        <input type="text" placeholder="Search for friend, post or video" />
      </div>
      <div className="links-nav">
        <ul className="page-links">
          <li>Homepage</li>
          <li>Timeline</li>
        </ul>
        <ul className="container-nofications">
          <li>
            <PersonIcon
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenReq(!isOpenReq);
              }}
              sx={{ cursor: "pointer" }}
            />
            <span className="numbers-nofications">
              {user.getRequests.length}
            </span>
            {isOpenReq && <Reqsfriend />}
          </li>
          <li>
            <ChatIcon />
            <span className="numbers-nofications">2</span>
          </li>
          <li>
            <NotificationsIcon />
            <span className="numbers-nofications">1</span>
          </li>
        </ul>
        <div className="end-links-nav">
          <Link to={`/profile/${user._id}`}>
            <img
              className="avatarPerson"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWSvJyNW1YOgmV40R5fpGII63MLSyuvFFh2jjE8RSo&s"
            />
          </Link>
          <span
            className="arrow-down"
            onClick={() => setIsOpenSetting(!isOpenSetting)}
          >
            {isOpenSetting && (
              <div className="table-settings">
                <Button
                  size="small"
                  sx={{
                    color: "black",
                    textTransform: "capitalize",
                    width: "100%",
                  }}
                >
                  cài đặt
                </Button>
                <Button
                  size="small"
                  sx={{
                    color: "black",
                    textTransform: "capitalize",
                    width: "100%",
                  }}
                  onClick={() => {
                    setUser(null);
                  }}
                >
                  Đăng xuất
                </Button>
              </div>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
