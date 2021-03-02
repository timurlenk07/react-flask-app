import {Button, Modal} from "react-bootstrap";

export function UserDetailsModal(props) {
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
          Felhasználó részletei
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Név</p>
        <p>Email</p>
        <p>Jelszó</p>
        <p>Szerepek</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Mégsem</Button>
        <Button onClick={props.onHide}>Elfogadás</Button>
      </Modal.Footer>
    </Modal>
  );
}