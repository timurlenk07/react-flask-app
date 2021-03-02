import {useEffect, useState} from "react";
import {authFetch} from "../auth";
import {Container} from "react-bootstrap";
import {PermissionsTable} from "./PermissionsTable";

export default function AdminHome(props) {
  const [msg, setMsg] = useState('No data')
  useEffect(() => {
    authFetch('/admin/api/getAuthorizedUsers', {
      method: 'get'
    }).then(r => r.json())
      .then(r => {
        console.log(r);
        setMsg(JSON.stringify(r.admins[0]));
      }, [])
  })

  return (
    <Container className="mt-3 justify-content-start">
      <h1>Üdv az Admin otthonában!</h1>
      <p>
        Az üzenet: {msg}
      </p>
      <PermissionsTable/>
    </Container>
  )
}