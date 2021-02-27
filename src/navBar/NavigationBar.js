import {Nav, Navbar} from "react-bootstrap";


export default function NavigationBar(props) {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="#home">Demo App</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Demo</Nav.Link>
        <Nav.Link href="/register">Register</Nav.Link>
        <Nav.Link href="/admin/login">Admin Login</Nav.Link>
        {/*<Nav.Link href="/pricing">Pricing</Nav.Link>*/}
      </Nav>
    </Navbar>
  )
}