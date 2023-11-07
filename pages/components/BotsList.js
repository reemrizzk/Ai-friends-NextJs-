import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link';
import { PencilSquare } from "react-bootstrap-icons";

const BotsList = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [items, setItems] = useState([]);

  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  const myConfig = require('../config');

  return (
    <div id="left-column" className="col-10 col-md-3 col-sm-11 m-0 p-0">
      <nav id="bots-list-header" className="navbar navbar-expand navbar-dark ps-2">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Chatbots</a>
        </div>
        <div className="collapse navbar-collapse" id="navbar01">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown" title="New chatbot">
              <Link className="text-light me-2" href="../newBot">
                <PencilSquare />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div id="bots-list">
        {myConfig.bots.map((bot, index) => (
          <Link key={index} href={`/chat/${bot.name}`}>
            <div className="contact row py-1 ps-md-2 ps-lg-0">
              <div className="col-3 p-0 text-center mx-md-1 mx-lg-0">
                <img src={`/${bot.image}`} alt={bot.name} />
              </div>
              <div className="col-8 p-0 pt-2">
                <h6>{bot.name}</h6>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BotsList;
