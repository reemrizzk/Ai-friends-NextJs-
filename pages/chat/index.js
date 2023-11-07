import Head from 'next/head';
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { ChevronLeft, ThreeDotsVertical, SendFill } from "react-bootstrap-icons";
import SideMenu from "../components/SideMenu";
import BotsList from "../components/BotsList";

export default function ChatRoom() {
  const myConfig = require('../config');
  const [theme, setTheme] = useState(myConfig.theme);

  return (
    <>
      <Head>
        <title>Chats</title>
        <link rel="stylesheet" href={`/themes/${theme}.css`} />
      </Head>
      <div className="container-fluid">
        <div className="row">
          <SideMenu page="chat" />
          <BotsList />
          <div id="no-chat-column" className="col-md-8 p-0 m-0 d-none d-md-flex">
            <h3>Select a bot to start chatting</h3>
          </div>
        </div>
      </div>
    </>
  );
}
