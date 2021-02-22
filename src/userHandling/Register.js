import {Button, Col, Container, Form, InputGroup} from "react-bootstrap";
import {Link} from "react-router-dom";

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

export default function Register(props) {
    return (
        <Container className="w-25 justify-content-center" fluid>
            <h1>Regisztrációs űrlap</h1>
            Kérem töltse ki az alábbi mezőket.
            <Form>
                <Form.Group>
                    <Form.Check inline label="magánszemély" type='radio' name="btnradio"/>
                    <Form.Check inline label="cég" type='radio' name="btnradio"/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="text" placeholder="Teljes név"/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="email" placeholder="Email cím"/>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="text" placeholder="Cím"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Telefonszám</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">+36</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            aria-label="phone"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <Form.Control type="password" placeholder="Jelszó"/>
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
                    <Form.Check inline label={<ReadPrivacyStatement/>} type='checkbox'/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Regisztráció
                </Button>
            </Form>
        </Container>
    )
}