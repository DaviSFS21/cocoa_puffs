import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';

function CocoaPuffForm() {
	const [name, setName] = useState("");

	const handleCreate = (e) => {
    e.preventDefault();
    console.log(name);
  };
	
  return (
		<Form onSubmit={handleCreate} style={{ display: "flex", gap: "12px" }}>
			<Row>
				<Col>
					<Form.Control 
						type="text"
						value={name}
						placeholder="Type Cocoa Puff name"
						style={{ width: "400px" }}
						onChange={(e) => setName(e.target.value)}
						/>
				</Col>
				<Col>
					<Button variant="info" type="submit">
						Add Cocoa Puff
					</Button>
				</Col>
			</Row>
		</Form>
  )
}

export default CocoaPuffForm
