import logo from "../logo.svg";
import {useEffect, useState} from "react";

export function DemoView(props) {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('/time').then(res => res.json()).then(data => {
        setCurrentTime(data.time);
      });
    }, 1000)
    return () => clearInterval(interval);
  }, []);

  return <header className="App-header">
    <img src={logo} className="App-logo" alt="logo"/>
    <p>
      Edit <code>src/App.js</code> and save to reload.
    </p>
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
    <p>The current time is {Math.round(currentTime)}.</p>
  </header>;
}