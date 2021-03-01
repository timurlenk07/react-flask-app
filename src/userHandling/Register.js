import {Container} from "react-bootstrap";
import PropTypes from "prop-types";
import {RegisterForm} from "./RegisterForm";

RegisterForm.propTypes = {handleRegister: PropTypes.func}

export default function Register(props) {

  function handleRegister(values) {
    console.log(values)
    fetch('#', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(values)//JSON.stringify({ title: 'React Hooks POST Request Example' })
    }).then(response => response.json())
      .then(response => {
        console.log('Registration success response was: ' + response.success)
        if (response.success) {
          window.location.href = '/register'
        } else {
          console.log('Maybe next time...' + response.msg)
        }
      })
      .catch(error => {
        console.error('There was an error!', error)
      })
  }


  return (
    <Container className="w-25 mt-3 mb-3 justify-content-center" fluid>
      <h1>Regisztrációs űrlap</h1>
      <p>Kérem töltse ki az alábbi mezőket.</p>
      <RegisterForm handleRegister={handleRegister}/>
    </Container>
  )
}