import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';

const FruityPebbleModal = ({ show, handleClose }) => {
  return <Modal centered show={show} onHide={handleClose}>
    <Modal.Header>
      <Modal.Title>Create Fruity Pebble in (CocoaPuffName)</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <Form style={{ display: "grid", gap: "12px" }}>
        <Form.Control type="text" placeholder="Type Fruity Pebble name" />
        <Form.Control type="number" placeholder="Type the quantity, less than 10" max="10" />
        <div style={{ display: "flex", gap: "12px" }}>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="info" type="submit" onClick={handleClose}>
            Add Fruity Pebble
          </Button>
        </div>
      </Form>
    </Modal.Body>
  </Modal>
}

FruityPebbleModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default FruityPebbleModal;
