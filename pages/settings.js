import Head from 'next/head';
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import SideMenu from "./components/SideMenu";

export default function Settings() {
  
  const myConfig = require('./config');
  const [theme, setTheme] = useState(myConfig.theme);
  const [selectedTheme, setSelectedTheme] = useState(myConfig.theme);

  const handleThemeChange = (event) => {
    setSelectedTheme(event.target.value);
  };

  const handleSave = async (theme) => {
    try {
      const response = await fetch('/api/changeTheme', {
        method: 'POST',
        body: selectedTheme,
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

  return (
    <>
      <Head>
        <title>Settings</title>
        <link rel="stylesheet" href={`/themes/${theme}.css`} />
      </Head>
      <div className="container-fluid">
        <div className="row">
          <SideMenu page="settings" />
          <div className="col-10 col-sm-11 p-0 m-0">

            <nav id="bots-list-header" className="navbar navbar-expand navbar-dark ps-2">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">Settings</a>
              </div>
            </nav>

            <div className={`content container-fluid ps-2 ps-md-5 py-4 ${theme === "neon" || theme === "dark" ? "text-light" : ""}`}>
              <h3>Settings</h3>
       
              <form>
                <div className="my-2">
                  <label>Change theme:</label>
                  <select
                    className="form-select mt-2 mb-1 ms-2"
                    value={selectedTheme}
                    onChange={handleThemeChange}
                  >
                    <option value="blue">Blue</option>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="dark">Dark</option>
                    <option value="neon">Neon</option>
                  </select>
                </div>
                <button
                  id="save-button"
                  type="button"
                  className="btn"
                  onClick={handleSave}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
