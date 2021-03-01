import {Button, Nav, Navbar} from "react-bootstrap";
import {logout, useAuth} from "../auth";


export default function NavigationBar(props) {
  const [logged] = useAuth()
  const handleLogout = () => {
    logout()
  }

  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#home">Demo App</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/demo">Demo</Nav.Link>
        <Nav.Link href="/register">Regisztráció</Nav.Link>
        <Nav.Link href="/admin">Admin oldal</Nav.Link>
      </Nav>
      <Nav className="ml-auto">
        {logged ?
          <Button variant="light" onClick={handleLogout}>Kijelentkezés</Button> :
          <Button variant="light" href="/admin/login">Bejelentkezés</Button>}
      </Nav>
    </Navbar>
  )
}