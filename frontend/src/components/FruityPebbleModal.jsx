import { useState } from 'react';
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

const FruityPebbleModal = ({ show, handleClose, cocoaPuffID }) => {
	const [name, setName] = useState("");
  const [pebbleCount, setPebbleCount] = useState(0);
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleCreate = (e) => {
		e.preventDefault();
	
		fetch(`http://localhost:3000/api/cocoa_puffs/${cocoaPuffID}/fruity_pebbles`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, pebble_count: pebbleCount, cocoa_puff_id: cocoaPuffID }),
		})
			.then((response) => {
        console.log(JSON.stringify({ name, pebble_count: pebbleCount, cocoa_puff_id: cocoaPuffID }))
				if (!response.ok) {
					return response.json().then((err) => {
						throw new Error(err.errors ? err.errors.join(", ") : "Erro ao criar Fruity Pebble");
					});
				}
				return response.json();
			})
			.then((data) => {
				console.log("Fruity Pebble criado:", data);

				window.location.reload();
			})
			.catch((error) => {
        setAlertMessage(error.message || "Erro ao criar CocoaPuff");
        setAlertState(true);

        setTimeout(() => {
          setAlertState(false);
        }, 3000);
			});
	};

  const checkCount = (event) => {
    const value = parseInt(event.target.value, 10);
    setPebbleCount(value);
    setAllowSubmit(value >= 10);
  }

  return <Modal centered show={show} onHide={handleClose}>
    <Modal.Header>
      <Modal.Title>Create Fruity Pebble on Cocoa Puff {cocoaPuffID}</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <Form onSubmit={handleCreate} style={{ display: "grid", gap: "12px" }}>
        <Form.Control
        type="text"
        placeholder="Type Fruity Pebble name"
        onChange={(e) => setName(e.target.value)}
        required
        />
        <Form.Control
        type="number"
        placeholder="Type the pebble count, less than 10"
        max="10"
        onChange={checkCount}
        required
        />
        <div style={{ display: "flex", gap: "12px" }}>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button disabled={allowSubmit} variant="info" type="submit">
            Add Fruity Pebble
          </Button>
          <Alert variant="warning" show={allowSubmit}>
            Pebble count might be less than 10
          </Alert>
          <Alert key="warning"
            variant="warning"
            show={alertState}
            style={{ marginBottom: "0" }}
            className="shadow-lg"
            >
            {alertMessage}
          </Alert>
        </div>
      </Form>
    </Modal.Body>
  </Modal>
}

FruityPebbleModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  cocoaPuffID: PropTypes.number.isRequired
};

export default FruityPebbleModal;
