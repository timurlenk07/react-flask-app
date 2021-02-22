import {useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import logo from './logo.svg';
import "bootswatch/dist/cerulean/bootstrap.min.css";
import './App.css';
import Register from "./userHandling/Register";
import Login from "./userHandling/Login";

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('/time').then(res => res.json()).then(data => {
        setCurrentTime(data.time);
    });
    }, 1000)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
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
            </header>
          </Route>
          <Route exact path="/register">
            <Register/>
          </Route>
          <Route path="/admin">
            <Login/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
