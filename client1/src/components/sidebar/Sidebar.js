import React from "react";
import "./sidebar.css";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import GroupIcon from "@mui/icons-material/Group";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import { Button } from "@mui/material";
import { Users } from "../../dummyData";
import Friendcloset from "../friendcloset/Friendcloset";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="container-sidebar">
        <ul className="link-sidebar">
          <li>
            <RssFeedIcon /> Feed
          </li>
          <li>
            <ChatIcon /> Chats
          </li>
          <li>
            <PlayCircleIcon /> Videos
          </li>
          <li>
            <GroupIcon /> Groups
          </li>
          <li>
            <BookmarkIcon /> Bookmarks
          </li>
          <li>
            <HelpOutlineIcon /> Questions
          </li>
          <li>
            <WorkIcon /> Jobs
          </li>
          <li>
            <EventIcon /> Events
          </li>
          <li>
            <SchoolIcon /> Courses
          </li>
        </ul>
        <Button
          variant="contained"
          sx={{ width: 150, height: 30, bgcolor: "#E9E9E9", color: "#000" }}
        >
          Show more
        </Button>
        <div className="div-two-sidebar"></div>
        <ul className="friendcloset">
          {Users.map((user) => {
            return <Friendcloset key={user.id} user={user} />;
          })}
        </ul>
      </div>
    </div>
  );
}
