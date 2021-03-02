import {useFormik} from "formik";
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import * as yup from "yup";
import {Link} from "react-router-dom";


function range(start, end) {
  return Array.from({length: end - start + 1}, (_, i) => i + start)
}

function ReadPrivacyStatement() {
  return (
    <>
      Elolvastam és elfogadom az{' '}
      <Link to="/docs/privacy_policy">Adatkezelési tájékoztatót</Link>
      {' '}és a{' '}
      <Link to="/docs/privacy_policy">Fogyasztói tájékoztatót</Link>
      , valamint az{' '}
      <Link to="/docs/privacy_policy">Általános szerződési feltételeket</Link>
      .
    </>
  )
}

const schema = yup.object().shape({
  registrationType: yup.string().oneOf(['magánszemély', 'cég']),
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  address: yup.string().required(),
  phone: yup.number().required(),
  password: yup.string().ensure().min(8).required(
  ).test('hasLowercase', 'A jelszónak tartalmaznia kell kisbetűt', text => text !== text.toUpperCase()
  ).test('hasUppercase', 'A jelszónak tartalmaznia kell nagybetűt', text => text !== text.toLowerCase()
  ).test('hasLowercase', 'A jelszónak tartalmaznia kell számot', text => /[0-9]/.test(text)
  ),
  birthYear: yup.number().required().min(1900).max(2021),
  birthMonth: yup.number().required().min(1).max(12),
  birthDay: yup.number().required().min(1).max(31),
  terms: yup.bool().required().oneOf([true], 'A regisztrációhoz el kell fogadnia a feltételeket.'),
});

export function RegisterForm({handleRegister}) {
  const formik = useFormik({
    initialValues: {
      registrationType: 12,
      fullName: '',
      email: '',
      address: '',
      phone: '',
      password: '',
      birthYear: 0,
      birthMonth: 0,
      birthDay: 0,
      terms: false,
    },
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: handleRegister
  })

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Form.Group as={Form.Row} className="justify-content-center">
        <Form.Check
          inline label="magánszemély" value="magánszemély" type='radio' name="registrationType"
          checked={formik.values.registrationType === "magánszemély"} onChange={formik.handleChange}
          isInvalid={!!formik.errors.registrationType}
        />
        <Form.Check
          inline label="cég" value="cég" type='radio' name="registrationType"
          checked={formik.values.registrationType === "cég"} onChange={formik.handleChange}
          isInvalid={!!formik.errors.registrationType}
        />
      </Form.Group>
      <Form.Group as={Form.Row}>
        <Form.Control
          type="text"
          placeholder="Teljes név"
          name="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          // isValid={!formik.errors.fullName}
          isInvalid={!!formik.errors.fullName}
        />
        {/*<Form.Control.Feedback>Nice name!</Form.Control.Feedback>*/}
        <Form.Control.Feedback type="invalid">{formik.errors.fullName}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Form.Row}>
        <Form.Control
          type="email"
          placeholder="Email cím"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          isInvalid={!!formik.errors.email}
        />
        {/*<Form.Control.Feedback>Valid email!</Form.Control.Feedback>*/}
        <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Form.Row}>
        <Form.Control
          type="text"
          placeholder="Cím"
          name="address"
          value={formik.values.address}
          onChange={formik.handleChange}
          isInvalid={!!formik.errors.address}
        />
      </Form.Group>
      <Form.Group as={Form.Row}>
        <Form.Label>Telefonszám</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">+36</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type="text"
            placeholder="pl. 309871234"
            aria-label="phone"
            aria-describedby="basic-addon1"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.phone}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.phone}</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Row className="mb-2 align-items-center">
        <Form.Group as={Col} className="justify-content-start">
          <Form.Row><Form.Label>Jelszó</Form.Label></Form.Row>
          <Form.Control
            type="password"
            placeholder="Jelszó"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.password}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
        </Form.Group>
        <Col>
          <Row><small className="text-danger text-uppercase">A jelszónak tartalmaznia kell:</small></Row>
          <Row>
            <Col className="justify-content-start">
              <Row className="text-nowrap">- 8 karakter</Row>
              <Row className="text-nowrap">- 1 nagybetű</Row>
            </Col>
            <Col className="justify-content-start">
              <Row className="text-nowrap">- 1 kisbetű</Row>
              <Row className="text-nowrap">- 1 szám</Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Form.Row><Form.Label>Születési idő</Form.Label></Form.Row>
      <Form.Group as={Row}>
        <Col>
          <Form.Control as="select"
                        name="birthYear" value={formik.values.birthYear}
                        onChange={formik.handleChange} isInvalid={!!formik.errors.birthYear}>
            <option disabled key={0} value={0}>Év</option>
            {range(1900, 2021).reverse().map((i) => {
              return (<option key={i} value={i}>{i}</option>);
            })}
          </Form.Control>
        </Col>
        <Col>
          <Form.Control as="select"
                        name="birthMonth" value={formik.values.birthMonth}
                        onChange={formik.handleChange} isInvalid={!!formik.errors.birthMonth}>
            <option disabled key={0} value={0}>Hónap</option>
            {range(1, 12).map((i) => {
              return (<option key={i} value={i}>{i}</option>);
            })}
          </Form.Control>
        </Col>
        <Col>
          <Form.Control as="select"
                        name="birthDay" value={formik.values.birthDay}
                        onChange={formik.handleChange} isInvalid={!!formik.errors.birthDay}>
            <option disabled key={0} value={0}>Nap</option>
            {range(1, 31).map((i) => {
              return (<option key={i} value={i}>{i}</option>);
            })}
          </Form.Control>
        </Col>
      </Form.Group>
      <Form.Group>
        <Form.Check>
          <Form.Check.Input type='checkbox' name="terms"
                            checked={formik.values.terms} onChange={formik.handleChange}
                            isInvalid={!!formik.errors.terms}/>
          <Form.Check.Label><ReadPrivacyStatement/></Form.Check.Label>
          <Form.Control.Feedback type="invalid">{formik.errors.terms}</Form.Control.Feedback>
        </Form.Check>
      </Form.Group>
      <Button variant="primary" type="submit">
        Regisztráció
      </Button>
    </Form>
  )
}
