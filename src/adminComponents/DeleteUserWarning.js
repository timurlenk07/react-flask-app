import {Button, Modal} from "react-bootstrap";

export function DeleteUserWarning(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Felhasználó törlése
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Figyelem!</h4>
        <p>
          Biztosan törölni szeretné ezt a felhasználót?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Visszavonás</Button>
        <Button onClick={props.onHide}>Törlés</Button>
      </Modal.Footer>
    </Modal>
  );
}