import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert'
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
					// Lança um erro para respostas com status HTTP fora da faixa 2xx
					return response.json().then((err) => {
						throw new Error(err.message || "Erro ao criar CocoaPuff");
					});
				}
				return response.json();
			})
			.then((data) => {
				console.log("CocoaPuff criado:", data);

				window.location.reload();
			})
			.catch((error) => {
				console.error("Erro ao criar CocoaPuff:", error);
				setAlertMessage(error.message || "Erro ao criar CocoaPuff");
				setAlertState(true);
				setTimeout(() => {
					setAlertState(false);
				}, 3000);
			});
	};	
	
  return (
		<Form onSubmit={handleCreate} style={{ display: "flex", gap: "12px" }}>
			<Row>
				<Col>
					<Form.Control 
						type="text"
						value={name}
						placeholder="Type Cocoa Puff name"
						style={{ width: "25em" }}
						onChange={(e) => setName(e.target.value)}
						/>
				</Col>
				<Col>
					<Button variant="info" type="submit" style={{ width: "10em" }}>
						Add Cocoa Puff
					</Button>
				</Col>
				<Col>
					<Alert key="warning" variant="warning" show={alertState}>
						{alertMessage}
					</Alert>
				</Col>
			</Row>
		</Form>
  )
}

export default CocoaPuffForm
