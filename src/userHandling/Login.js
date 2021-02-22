import {Button, Container, Form} from "react-bootstrap";


export default function Login(props) {
  return (
    <Container className="w-25 justify-content-center" fluid>
      <h1>Belépés</h1>
      Adja meg a felhasználónevét és jelszavát a bejelentkezéshez.
      <Form>
        <Form.Group>
          <Form.Control type="email" placeholder="Email cím"/>
        </Form.Group>
        <Form.Group>
          <Form.Control type="password" placeholder="Jelszó"/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Belépés
        </Button>
      </Form>
    </Container>
  )
}