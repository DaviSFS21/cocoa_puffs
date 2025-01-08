import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FruityPebbleList from "./FruityPebbleList";
import FruityPebbleModal from "./FruityPebbleModal";
import Alert from 'react-bootstrap/Alert';

function CocoaPuffList() {
  const [showModal, setShowModal] = useState(false);
  const [cocoaPuffs, setCocoaPuffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alertState, setAlertState] = useState(false);
  const [cocoaPuffID, setCocoaPuffID] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/api/cocoa_puffs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar CocoaPuffs");
        }
        return response.json();
      })
      .then((data) => {
        setCocoaPuffs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleArchive = (id) => {
    if (!id) {
      alert("Crie um CocoaPuff primeiro ou forneça um ID válido.");
      return;
    }

    fetch(`http://localhost:3000/api/cocoa_puffs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ archived: true }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("CocoaPuff arquivado:", data);

        setCocoaPuffs((prevCocoaPuffs) =>
          prevCocoaPuffs.map((cocoaPuff) =>
            cocoaPuff.id === id ? { ...cocoaPuff, archived: true } : cocoaPuff
          )
        );

        setAlertState(true);
        setTimeout(() => {
          setAlertState(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Erro ao arquivar CocoaPuff:", error);
        alert("Erro ao arquivar CocoaPuff");
      });
  };
  
  if (loading) {
    return <p>Carregando CocoaPuffs...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <>
    <Alert key="warning" variant="warning" show={alertState}>
      The CocoaPuff has been archived!
    </Alert>
    {cocoaPuffs.length === 0 ? (
        <p>Nenhum CocoaPuff encontrado.</p>
      ) : (
        <Row>
          {cocoaPuffs.filter(cocoaPuff => !cocoaPuff.archived).map((cocoaPuff) => (
            <Col key={cocoaPuff.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
              <Card style={{ padding: "20px", borderRadius: "20px" }}>
                <Row>
                  <Col>
                    Cocoa Puff {cocoaPuff.id}: {cocoaPuff.name}<br />
                    <a href="#" onClick={() => handleArchive(cocoaPuff.id)}>
                      Arquivar
                    </a>
                    <br />
                    Fruity Pebbles:
                  </Col>
                  <Col>
                    <Button variant="info" onClick={() => {
                      setShowModal(true);
                      setCocoaPuffID(cocoaPuff.id);
                    }}>
                      Add Fruity Pebble
                    </Button>
                  </Col>
                </Row>
                <FruityPebbleList cocoaPuffID={cocoaPuff.id} />
              </Card>
            </Col>
          ))}
          <FruityPebbleModal show={showModal} handleClose={() => setShowModal(false)} cocoaPuffID={cocoaPuffID} />
        </Row>
      )}
    </>
  );
}

export default CocoaPuffList;