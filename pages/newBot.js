import Head from 'next/head';
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import SideMenu from "./components/SideMenu";

function newBot() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState('ChatGPT.png');
  const myConfig = require('./config');
  const [theme, setTheme] = useState(myConfig.theme);
  const images = [
    "ChatGPT.png", "boy1.png", "boy2.png", "boy3.png", "boy4.png", "boy5.png", "girl1.png", "girl2.png", "girl3.png", "girl4.png", "girl5.png"
  ];

  const handleAdd = async () => {
    try {
      const formData = `name=${name}&description=${description}&selectedImage=${selectedImage}`;

      const response = await fetch('/api/addBot', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        console.log('Configuration updated successfully');
      } else {
        console.error('Error updating configuration');
      }
    } catch (error) {
      console.error('API request failed', error);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <>
      <Head>
        <title>Settings</title>
        <link rel="stylesheet" href={`/themes/${theme}.css`} />
      </Head>
      <div className="container-fluid">
        <div className="row">
          <SideMenu page="newBot" />
          <div className="col-10 col-sm-11 p-0 m-0">

            <nav id="bots-list-header" className="navbar navbar-expand navbar-dark ps-2">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">Settings</a>
              </div>
            </nav>

            <div className={`content container-fluid ps-2 ps-md-5 py-4 ${theme === "neon" || theme === "dark" ? "text-light" : ""}`}>
              <h3>Add a new bot</h3>
              <form id="new-bot-form">
                <div className="form-group">
                  <label htmlFor="name">Bot name:</label>
                  <input
                    type="text"
                    className="form-control mt-2 mb-1 ms-2"
                    id="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Bot description:</label>
                  <input
                    type="text"
                    className="form-control mt-2 mb-1 ms-2"
                    id="description"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <h5>Examples:</h5>
                  <ul>
                    <li>a funny cheerful girl who loves writing.</li>
                    <li>a smart sporty boy who loves football.</li>
                  </ul>
                </div>
                <div className="form-group">
                  <label htmlFor="image">Select an image:</label>
                  <div className="image-grid">
                    {images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={image}
                        className={`image-item m-2 ${selectedImage === image ? 'selected' : ''}`}
                        onClick={() => handleImageClick(image)}
                      />
                    ))}
                  </div>
                </div>
                <button id="save-button" type="button" className="btn mt-3" onClick={handleAdd}>
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default newBot;
