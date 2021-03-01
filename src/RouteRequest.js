import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Register from "./userHandling/Register";
import {DemoView} from "./demo/DemoView";
import AdminRouter from "./adminComponents/AdminRouter";


export default function RouteRequest(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/demo">
          <DemoView/>
        </Route>
        <Route exact path="/register">
          <Register/>
        </Route>
        <Route path="/admin">
          <AdminRouter/>
        </Route>
        <Redirect to="/register"/>
      </Switch>
    </BrowserRouter>
  )
}