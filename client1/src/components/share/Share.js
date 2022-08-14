import React from "react";
import "./share.css";
import { useGlobalContext } from "../../context/context";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import LabelIcon from "@mui/icons-material/Label";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Button } from "@mui/material";
export default function Share() {
  const { user } = useGlobalContext();
  return (
    <div className="share">
      <div className="share-info-user">
        <img
          className="avatarPerson"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWSvJyNW1YOgmV40R5fpGII63MLSyuvFFh2jjE8RSo&s"
        />
        {user.fullname}
      </div>
      <textarea
        className="share-thinking"
        placeholder="What's your mind pro?"
      />
      <div className="share-bottom">
        <ul className="options-share">
          <li>
            <PhotoLibraryIcon sx={{ color: "tomato" }} /> Photo or video
          </li>
          <li>
            <LabelIcon sx={{ color: "blue" }} />
            Tag
          </li>
          <li>
            <LocationOnIcon sx={{ color: "green" }} />
            Location
          </li>
          <li>
            <EmojiEmotionsIcon sx={{ color: "goldenrod" }} />
            Feelings
          </li>
        </ul>
        <Button variant="contained" color="success" size="small">
          Share
        </Button>
      </div>
    </div>
  );
}
