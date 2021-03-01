import {Alert, Button, Container, Form} from "react-bootstrap";
import * as yup from "yup";
import {useFormik} from "formik";
import {login} from "../auth";
import {useState} from "react";
import PropTypes from "prop-types";


const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

LoginForm.propTypes = {handleLogin: PropTypes.func}

function LoginForm({handleLogin}) {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: handleLogin
  })

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Control type="email" placeholder="Email cím"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}/>
      </Form.Group>
      <Form.Group>
        <Form.Control type="password" placeholder="Jelszó"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Belépés
      </Button>
    </Form>
  )
}


export default function Login() {
  const [errMsg, setErrMsg] = useState(null)

  const handleLogin = credentials => {
    fetch('/admin/login', {
      method: 'post',
      body: JSON.stringify(credentials)
    }).then(r => r.json())
      .then(token => {
        if (token.access_token) {
          login(token)
        } else {
          setErrMsg(token.message)
        }
      })
  }


  return (
    <Container className="w-25 justify-content-center" fluid>
      <h1>Belépés</h1>
      Adja meg a felhasználónevét és jelszavát a bejelentkezéshez.
      {errMsg && <Alert variant="danger">{errMsg}</Alert>}
      <LoginForm handleLogin={handleLogin}/>
    </Container>
  )
}