import {Button, Form, InputGroup} from "react-bootstrap";
import {Link} from "react-router-dom";

function range(start, end) {
    return Array.from({length: end - start + 1}, (_, i) => i + start)
}

const readPrivacyStatement = (
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

export default function Register(props) {
    return (
        <div>
            <h1>Regisztrációs űrlap</h1>
            Kérem töltse ki az alábbi mezőket.
            <div className="mb-3">
                <Form>
                    <Form.Group>
                        <Form.Check inline label="magánszemély" type='radio'/>
                        <Form.Check inline label="cég" type='radio'/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Teljes név"/>
                        <Form.Control type="email" placeholder="Email cím"/>
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
                        <Form.Control as="select">
                            {range(1900, 2021).reverse().map((i) => {
                                return (<option>{i}</option>);
                            })}
                        </Form.Control>
                        <Form.Control as="select">
                            {range(1, 12).map((i) => {
                                return (<option>{i}</option>);
                            })}
                        </Form.Control>
                        <Form.Control as="select">
                            {range(1, 31).map((i) => {
                                return (<option>{i}</option>);
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Check inline label={readPrivacyStatement} type='radio'/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Regisztráció
                    </Button>
                </Form>
            </div>
        </div>
    )
}