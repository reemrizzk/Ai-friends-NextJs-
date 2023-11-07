import Head from 'next/head';
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { ChevronLeft, ThreeDotsVertical, SendFill } from "react-bootstrap-icons";
import { useRouter } from "next/router";
import OpenAI from "openai";
import "dotenv";
import SideMenu from "../components/SideMenu";
import BotsList from "../components/BotsList";
import Link from 'next/link';

export default function ChatRoom() {
  const router = useRouter();
  const { bot } = router.query;
  const [botImage, setBotImage] = useState("ChatGPT.png");
  const [botPrompt, setBotPrompt] = useState("");
  const [c1, setc1] = useState("ChatGPT");
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const myConfig = require('../config');
  const [theme, setTheme] = useState(myConfig.theme);
  const [isMdAndAbove, setIsMdAndAbove] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMdAndAbove(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const matchingBot = myConfig.bots.find((b) => b.name === bot);

    if (matchingBot) {
      setBotImage(matchingBot.image);
      setBotPrompt(matchingBot.prompt);
    } else {
      setBotImage("ChatGPT.png");
      setBotPrompt("");
    }
    setChatMessages([]);
  }, [bot]);

  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  const testx = () => {
    setIsButtonDisabled(true);
  };

  const sendMessage = () => {
    const message = `<div class="message user-message">${userInput}</div><div style="clear:both;"></div>`;
    const newTheme = 'red';
    setChatMessages(prevMessages => [...prevMessages, message]);

    setTimeout(() => {
      const typingIcon = () => {
        return `<span><ThreeDots /></span>`;
      };

      const typingMessage =
        `
        <div class="message bot-message">
          <div class="typing-animation">
            <span class="dot dot1">&#9679;</span>
            <span class="dot dot2">&#9679;</span>
            <span class="dot dot3">&#9679;</span>
          </div>
        </div>
        <div>
        `;

      setChatMessages(prevMessages => [...prevMessages, typingMessage]);

      const fetchGeneratedText = async () => {
        const headers = {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        };

        const messages = [
          {
            role: 'user',
            content: botPrompt + "" + userInput,
          },
        ];

        const data = {
          model: 'gpt-3.5-turbo',
          messages: messages,
          max_tokens: 35,
        };

        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
          });

          if (response.ok) {
            const responseData = await response.json();

            if (
              responseData.choices &&
              responseData.choices.length > 0 &&
              responseData.choices[0].message
            ) {
              const botMessage = `<div class="message bot-message">` + responseData.choices[0].message.content + `</div><div style="clear:both;"></div>`;
              setChatMessages(prevMessages => [...prevMessages.slice(0, -1), botMessage]);
            } else {
              const botMessage = `<div class="message bot-message">Error</div><div style="clear:both;"></div>`;
            }

            setIsButtonDisabled(false);
          } else {
            console.error('Error:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

      fetchGeneratedText();
    }, 1500);
  };

  const handleSendClick = () => {
    const trimmedInput = userInput.trim();

    if (trimmedInput !== '') {
      sendMessage();
      setUserInput('');
    }
  };

  return (
    <>
      <Head>
        <title>Chat with {bot}</title>
        <link rel="stylesheet" href={`/themes/${theme}.css`} />
      </Head>
      <div className="container-fluid">
        <div className="row">
          {isMdAndAbove && (
            <>
              <SideMenu page="chat" />
              <BotsList />
            </>
          )}
          <div id="right-column" className="col-md-8 p-0 m-0">
            <main>
              <nav id="chat-header" className="navbar navbar-expand navbar-dark ">
                <div className="container-fluid">
                  <h5 className="me-2">
                    <Link href="../chat">
                      <span className="text-light"><ChevronLeft /></span>
                    </Link>
                  </h5>
                  <img className="me-2" src={"/" + botImage} />
                  <a className="navbar-brand" href="#">{bot}</a>
                  <div className="collapse navbar-collapse" id="navbar01">
                  </div>
                </div>
              </nav>
              <div id="chat-messages">
                {chatMessages.map((message, index) => (
                  <div key={index} dangerouslySetInnerHTML={{ __html: message }} />
                ))}
              </div>
              <footer>
                <div className="input-group p-2">
                  <input type="text" id="user-input" className="form-control" placeholder="Type your message..." value={userInput} onChange={e => setUserInput(e.target.value)} />
                  <div className="input-group-append">
                    <button onClick={handleSendClick} className="btn btn-primary" id="send-button" disabled={isButtonDisabled}><SendFill /></button>
                  </div>
                </div>
              </footer>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
