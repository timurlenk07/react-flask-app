import "bootswatch/dist/cerulean/bootstrap.min.css";
import './App.css';
import NavigationBar from "./navBar/NavigationBar"
import RouteRequest from "./RouteRequest";

function App() {
  return (
    <div className="App">
      <NavigationBar/>
      <RouteRequest/>
    </div>
  );
}

export default App;
