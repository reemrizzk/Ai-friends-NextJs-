import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import SideMenu from "./components/SideMenu";

export default function Home() {
  const myConfig = require('./config');
  const [theme, setTheme] = useState(myConfig.theme);

  return (
    <>
      <Head>
        <title>AI Friends</title>
        <link rel="stylesheet" href={`/themes/${theme}.css`} />
      </Head>
      <div className="container-fluid">
        <div className="row">
          <SideMenu page="home" />
          <div className="col-10 col-sm-11 p-0 m-0">
            <nav id="bots-list-header" className="navbar navbar-expand navbar-dark ps-2">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">Home</a>
              </div>
            </nav>
            <div className={`content container-fluid ps-2 ps-md-5 py-4 ${theme === "neon" || theme === "dark" ? "text-light" : ""}`}>
              <h3>AI Friends</h3>
              <p>AI friends is a NextJs/React web application where you can chat with AI chatbots, powered by ChatGPT from <a href="https://openai.com">OpenAI</a>.</p>
              <p>To use it, you need to obtain an OpenAI API key and add it to .env.local file in the root folder of the project, like this:<br />NEXT_PUBLIC_OPENAI_API_KEY = YOUR_KEY_HERE</p>
              <p>In the chat page, you can click on "New bot" to add a new bot, write bot name and description, and select an image.</p>
              <Link href="./chat/"><button id="chats-button" className="btn btn-secondary">Start chatting</button></Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}