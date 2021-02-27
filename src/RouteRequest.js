import {BrowserRouter, Route, Switch} from "react-router-dom";
import Register from "./userHandling/Register";
import Login from "./userHandling/Login";
import {DemoView} from "./demo/DemoView";


export default function RouteRequest(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <DemoView/>
        </Route>
        <Route exact path="/register">
          <Register/>
        </Route>
        <Route path="/admin">
          <Login/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}