import {Button, Container, Form} from "react-bootstrap";
import * as yup from "yup";
import {useFormik} from "formik";
import {login} from "../auth";
import {useHistory} from "react-router";


const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

function LoginForm(props) {
  const history = useHistory()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values)
      fetch('/admin/login', {
        method: 'post',
        body: JSON.stringify(values)
      }).then(r => r.json())
        .then(token => {
          if (token.access_token) {
            login(token)
            console.log(token)
            history.push("/admin/home")
          } else {
            console.log("Please type in correct username/password")
          }
        })
    }
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

export default function Login(props) {
  return (
    <Container className="w-25 justify-content-center" fluid>
      <h1>Belépés</h1>
      Adja meg a felhasználónevét és jelszavát a bejelentkezéshez.
      <LoginForm/>
    </Container>
  )
}