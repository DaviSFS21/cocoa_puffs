import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';

function CocoaPuffForm() {
	const [name, setName] = useState("");

	const handleCreate = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/api/cocoa_puffs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        { name, archived: false },
      ),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("CocoaPuff criado:", data);
        alert("CocoaPuff criado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao criar CocoaPuff:", error);
        alert("Erro ao criar CocoaPuff");
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
					
				</Col>
			</Row>
		</Form>
  )
}

export default CocoaPuffForm
