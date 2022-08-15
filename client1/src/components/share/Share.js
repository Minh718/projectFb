import React, { useState } from "react";
import "./share.css";
import { useGlobalContext } from "../../context/context";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import LabelIcon from "@mui/icons-material/Label";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useGlobalContext();
  const [filePost, setFilePost] = useState(null);
  return (
    <div className="share">
      <div className="share-info-user">
        <img
          className="avatarPerson"
          src={
            user.profilePicture
              ? PF + `person/${user.profilePicture}`
              : PF + "person/noAvatar.png"
          }
        />
        {user.fullname}
      </div>
      <textarea
        className="share-thinking"
        placeholder="What's your mind pro?"
      />
      {filePost && (
        <div className="container-img-posting">
          <img src={URL.createObjectURL(filePost)} className="imgShare" />
          <ClearIcon
            sx={{
              position: "absolute",
              top: "5px",
              right: "5px",
              cursor: "pointer",
            }}
            onClick={() => {
              setFilePost(null);
            }}
          />
        </div>
      )}
      <div className="share-bottom">
        <ul className="options-share">
          <label htmlFor="imgPost" style={{ cursor: "pointer" }}>
            <li>
              <PhotoLibraryIcon sx={{ color: "tomato" }} /> Photo or video
            </li>
            <input
              id="imgPost"
              type="file"
              accept=".png,.jpg,.jpeg"
              style={{ display: "none" }}
              onChange={(e) => {
                setFilePost(e.target.files[0]);
              }}
            />
          </label>
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
