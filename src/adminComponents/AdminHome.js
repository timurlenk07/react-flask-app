import {useEffect, useState} from "react";
import {authFetch} from "../auth";
import {Button, Col, Container, Row} from "react-bootstrap";
import {PermissionsTable} from "./PermissionsTable";


export default function AdminHome() {
  const [elements, setElements] = useState([])
  useEffect(() => {
    authFetch('/admin/api/getAuthorizedUsers', {
      method: 'get'
    }).then(r => r.json())
      .then(r => {
        setElements(r.admins);
      })
  }, [])

  return (
    <Container className="mt-3">
      <Row className="p-2">
        <Col className="text-left">
          <h1>Üdv az Admin otthonában!</h1>
          <Button>Új jogosult hozzáadása</Button>
        </Col>
      </Row>
      <Row className="p-2"><Col><PermissionsTable elements={elements}/></Col></Row>
    </Container>
  )
}