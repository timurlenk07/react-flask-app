import {Button, Col, Container, Form, InputGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useFormik} from 'formik'
import * as yup from 'yup';

function range(start, end) {
  return Array.from({length: end - start + 1}, (_, i) => i + start)
}

function ReadPrivacyStatement(props) {
  return (
    <div>
      Elolvastam és elfogadom az{' '}
      <Link to="/docs/privacy_policy">Adatkezelési tájékoztatót</Link>
      {' '}és a{' '}
      <Link to="/docs/privacy_policy">Fogyasztói tájékoztatót</Link>
      , valamint az{' '}
      <Link to="/docs/privacy_policy">Általános szerződési feltételeket</Link>
      .
    </div>
  )
}

const schema = yup.object().shape({
  registrationType: yup.string().oneOf(['magánszemély', 'cég']),
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  address: yup.string().required(),
  phone: yup.number().required(),
  password: yup.string().required(),
  birthDate: yup.date().required(),
  terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
});

function RegisterForm(props) {
  const formik = useFormik({
    initialValues: {
      registrationType: [],
      fullName: '',
      email: '',
      address: '',
      phone: '',
      password: '',
      birthDate: new Date(2001, 1, 1),
      terms: false,
    },
    validationSchema: schema,
    onSubmit: (values) => {
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
  })

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Check
          inline label="magánszemély" value="magánszemély" type='radio' name="registrationType"
          checked={formik.values.registrationType === "magánszemély"} onChange={formik.handleChange}
        />
        <Form.Check
          inline label="cég" value="cég" type='radio' name="registrationType"
          checked={formik.values.registrationType === "cég"} onChange={formik.handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Teljes név"
          name="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          isValid={!formik.errors.fullName}
        />
        <Form.Control.Feedback>Nice name!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="email"
          placeholder="Email cím"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          isInvalid={!!formik.errors.email}
        />
        {/*<Form.Control.Feedback>Valid email!</Form.Control.Feedback>*/}
        <Form.Control.Feedback type="invalid">
          {formik.errors.email}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Cím"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          isInvalid={!!formik.errors.address}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Telefonszám</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">+36</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type="text"
            placeholder="309871234"
            aria-label="phone"
            aria-describedby="basic-addon1"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.phone}
          />
        </InputGroup>
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="password"
          placeholder="Jelszó"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          isInvalid={!!formik.errors.password}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Születési idő</Form.Label>
        <Form.Row>
          <Col>
            <Form.Label>Év</Form.Label>
            <Form.Control as="select">
              {range(1900, 2021).reverse().map((i) => {
                return (<option key={i}>{i}</option>);
              })}
            </Form.Control>
          </Col>
          <Col>
            <Form.Label>Hó</Form.Label>
            <Form.Control as="select">
              {range(1, 12).map((i) => {
                return (<option key={i}>{i}</option>);
              })}
            </Form.Control>
          </Col>
          <Col>
            <Form.Label>Nap</Form.Label>
            <Form.Control as="select">
              {range(1, 31).map((i) => {
                return (<option key={i}>{i}</option>);
              })}
            </Form.Control>
          </Col>
        </Form.Row>
      </Form.Group>
      <Form.Group>
        <Form.Check
          inline label={<ReadPrivacyStatement/>} type='checkbox' name="terms"
          checked={formik.values.terms} onChange={formik.handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Regisztráció
      </Button>
    </Form>
  )
}

export default function Register(props) {
  return (
    <Container className="w-25 justify-content-center" fluid>
      <h1>Regisztrációs űrlap</h1>
      Kérem töltse ki az alábbi mezőket.
      <RegisterForm/>
    </Container>
  )
}