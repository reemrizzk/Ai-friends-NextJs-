import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
  HouseDoor,
  HouseDoorFill,
  ChatDots,
  ChatDotsFill,
  Gear,
  GearFill
} from "react-bootstrap-icons";
import Link from 'next/link';

const SideMenu = ({ page }) => {
  const myConfig = require('../config');
  return (
    <>
      <div id="side-menu" className="col-2 col-sm-1 m-0 p-0">
        <div className="side-menu-item py-3 text-center">
          <img id="logo" src="../logo.png" />
        </div>
        <div className="side-menu-item py-3 text-center">
          <Link href={`../`}>{page === "home" ? <HouseDoorFill /> : <HouseDoor />}</Link>
        </div>
        <div className="side-menu-item py-3 text-center">
          <Link href={`../chat`}>{page === "chat" ? <ChatDotsFill /> : <ChatDots />}</Link>
        </div>
        <div className="side-menu-item py-3 text-center">
          <Link href={`../settings`}>{page === "settings" ? <GearFill /> : <Gear />}</Link>
        </div>
      </div>
    </>
  );
};

export default SideMenu;