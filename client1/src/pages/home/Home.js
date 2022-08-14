import React from "react";
import Nav from "../../components/nav/Nav";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import { useGlobalContext } from "../../context/context";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";
export default function Home() {
  const { setIsOpenReq } = useGlobalContext();
  console.log(process.env);
  return (
    <div className="home" onClick={() => setIsOpenReq(false)}>
      <Nav />
      <div className="wrapper-body">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </div>
  );
}
