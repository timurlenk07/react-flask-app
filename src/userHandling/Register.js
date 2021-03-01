import {Alert, Container} from "react-bootstrap";
import PropTypes from "prop-types";
import {RegisterForm} from "./RegisterForm";
import {useState} from "react";

RegisterForm.propTypes = {handleRegister: PropTypes.func}

export default function Register(props) {
  const [errMsg, setErrMsg] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)

  function handleRegister(values) {
    console.log(values)
    fetch('#', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values)
    }).then(response => response.json())
      .then(response => {
        console.log('Registration success response was: ' + response.success)
        if (response.success) {
          // window.location.reload(false)
          setShowSuccess(true)
          setErrMsg(null)
        } else {
          let errMsgs = []
          for (let prop in response.msg) {
            response.msg[prop].forEach(err => errMsgs.push('' + prop + ': ' + err))
          }
          console.warn(errMsgs)
          setErrMsg(errMsgs[0])
          setShowSuccess(false)
        }
      })
      .catch(error => {
        console.error('There was an error!', error)
      })
  }


  return (
    <Container className="w-25 mt-3 mb-3 justify-content-center" fluid>
      {errMsg && <Alert variant="danger">{errMsg}</Alert>}
      {showSuccess && <Alert variant="success">Sikeres regisztráció!</Alert>}
      <h1>Regisztrációs űrlap</h1>
      <p>Kérem töltse ki az alábbi mezőket.</p>
      <RegisterForm handleRegister={handleRegister}/>
    </Container>
  )
}