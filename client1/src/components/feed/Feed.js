import React from "react";
import { useGlobalContext } from "../../context/context";
import Share from "../share/Share";
import "./feed.css";
import { useParams } from "react-router-dom";
export default function Feed() {
  const userId = useParams().id;
  const { user: userCurrent } = useGlobalContext();
  return (
    <div className="feed">
      <div className="container-feed">
        {(!userId || userId === userCurrent._id) && <Share />}
      </div>
    </div>
  );
}
