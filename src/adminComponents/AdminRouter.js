import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import AdminHome from "./AdminHome";
import Login from "../userHandling/Login";
import {useAuth} from "../auth";

const PrivateRoute = ({component: Component, ...rest}) => {
  const [logged] = useAuth();

  return <Route {...rest} render={(props) => (
    logged
      ? <Component {...props} />
      : <Redirect to='/admin/login'/>
  )}/>
}


export default function AdminRouter(props) {
  const logged = useAuth()
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/admin/login">
          {!logged ? <Login/> : <Redirect to='/admin/home'/>}
        </Route>
        <PrivateRoute path="/admin" component={AdminHome}/>
      </Switch>
    </BrowserRouter>
  )
}