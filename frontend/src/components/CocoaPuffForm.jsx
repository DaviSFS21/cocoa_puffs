import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';

function CocoaPuffForm() {
  const [name, setName] = useState("");
  const [alertState, setAlertState] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/api/cocoa_puffs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, archived: false }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.errors ? err.errors.join(", ") : "Erro ao criar CocoaPuff");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("CocoaPuff criado:", data);

        setName("");
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

  return (
    <div style={{ display: "grid" }}>
      <Form onSubmit={handleCreate}>
        <Row className="d-flex justify-content-start">
          <Col xs="auto" className="mb-2">
            <Form.Control
              type="text"
              value={name}
              placeholder="Type Cocoa Puff name"
              style={{ width: "300px" }}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Col>
          <Col xs="auto">
            <Button
              variant="info"
              type="submit"
              style={{ width: "150px" }}
            >
              Add Cocoa Puff
            </Button>
          </Col>
          <Col>
            <Alert key="warning"
              variant="warning"
              show={alertState}
              style={{ maxWidth: "400px", position: "absolute", zIndex: "1050", marginBottom: "0" }}
              className="shadow-lg"
              >
              {alertMessage}
            </Alert>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default CocoaPuffForm;
