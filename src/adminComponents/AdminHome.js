import {useEffect, useState} from "react";
import {authFetch} from "../auth";
import {Button, Col, Container, Row} from "react-bootstrap";
import {PermissionsTable} from "./PermissionsTable";
import {DeleteUserWarning} from "./DeleteUserWarning";
import {UserDetailsModal} from "./UserDetailsModal";


export default function AdminHome() {
  const [elements, setElements] = useState([])
  const [deleteWarningShow, setDeleteWarningShow] = useState(false);
  const [userDetailsShow, setUserDetailsShow] = useState(false);

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
          <Button onClick={() => setUserDetailsShow(true)}>Új jogosult hozzáadása</Button>
        </Col>
      </Row>
      <Row className="p-2">
        <Col>
          <PermissionsTable
            elements={elements}
            showDetailsView={() => setUserDetailsShow(true)}
            showDeleteView={() => setDeleteWarningShow(true)}/>
        </Col>
      </Row>

      <UserDetailsModal show={userDetailsShow}
                        onHide={() => setUserDetailsShow(false)}/>
      <DeleteUserWarning show={deleteWarningShow} onHide={() => setDeleteWarningShow(false)}/>
    </Container>
  );
}